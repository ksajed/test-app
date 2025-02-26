import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  TapGestureHandler,
  PinchGestureHandlerGestureEvent,
  PanGestureHandlerGestureEvent,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { type ImageSource } from 'expo-image';
import * as Sharing from 'expo-sharing';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import DrawingCanvas from '@/components/DrawingCanvas';

const PlaceholderImage = require('@/assets/images/background-image.png');

interface Point {
  x: number;
  y: number;
}

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmojis, setPickedEmojis] = useState<{ id: number; emoji: ImageSource }[]>([]);
  // isDrawing contrôle l'interactivité du canvas tout en conservant les tracés
  const [isDrawing, setIsDrawing] = useState(false);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!status) {
      requestPermission();
    }
  }, [status]);

  // Variables partagées pour zoom et pan
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (evt) => {
      scale.value = Math.min(Math.max(evt.scale, 0.3), 3);
    },
  });

  const panHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (evt) => {
      if (scale.value > 1) {
        translateX.value = evt.translationX;
        translateY.value = evt.translationY;
      }
    },
    onEnd: (evt) => {
      if (scale.value > 1) {
        translateX.value = evt.translationX;
        translateY.value = evt.translationY;
      }
    },
  });

  // Désactivation du TapGestureHandler en mode dessin pour éviter l'interception des touches
  const doubleTapHandler = useAnimatedGestureHandler<TapGestureHandlerStateChangeEvent>({
    onActive: () => {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const onShare = async () => {
    if (!selectedImage) {
      Alert.alert("Aucune image à partager.");
      return;
    }
    try {
      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert("Le partage n'est pas disponible sur cet appareil.");
        return;
      }
      await Sharing.shareAsync(selectedImage, { dialogTitle: "Partager la photo" });
    } catch (error) {
      Alert.alert("Erreur de partage", (error as Error).message);
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      Alert.alert('Aucune image sélectionnée.');
    }
  };

  const pickImageFromCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (!cameraPermission.granted) {
      Alert.alert("L'accès à la caméra est nécessaire pour prendre une photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 1,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      Alert.alert('Aucune photo prise.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined);
    setPickedEmojis([]);
    // Remise à zéro du mode dessin et des transformations
    setIsDrawing(false);
    scale.value = withTiming(1);
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
  };

  // Active le mode dessin (le DrawingCanvas reste monté)
  const onDrawOnImage = () => {
    setIsDrawing(true);
  };

  // Termine le mode dessin (les tracés restent affichés)
  const onFinishDrawing = () => {
    setIsDrawing(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const handleAddSticker = (emoji: ImageSource) => {
    setPickedEmojis((prev) => [...prev, { id: Date.now(), emoji }]);
    setIsModalVisible(false);
  };

  const removeSticker = (id: number) => {
    setPickedEmojis((prev) => prev.filter((item) => item.id !== id));
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, { height: 440, quality: 1 });
      await MediaLibrary.saveToLibraryAsync(localUri);
      Alert.alert('Image sauvegardée !');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* En mode "page d'accueil", si aucune image n'est sélectionnée, on affiche les deux boutons */}
      {!showAppOptions ? (
        <View style={styles.headerContainer}>
          <Button theme="primary" label="Select Image" onPress={pickImageAsync} />
          <Button theme="primary" label="Prendre une photo" onPress={pickImageFromCamera} />
        </View>
      ) : (
        <View style={styles.headerContainer}>
          {isDrawing ? (
            <IconButton icon="check" label="Terminer dessin" onPress={onFinishDrawing} />
          ) : (
            <>
              <IconButton icon="edit" label="Dessiner" onPress={onDrawOnImage} />
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
              <IconButton icon="share" label="Partager" onPress={onShare} />
            </>
          )}
        </View>
      )}

      {/* Zone image avec zoom/dézoom, pan et double tap */}
      <View style={styles.imageContainer}>
        <TapGestureHandler enabled={!isDrawing} numberOfTaps={2} onHandlerStateChange={doubleTapHandler}>
          <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
            <PinchGestureHandler onGestureEvent={pinchHandler} enabled={!isDrawing}>
              <Animated.View style={StyleSheet.absoluteFill}>
                <PanGestureHandler onGestureEvent={panHandler} enabled={!isDrawing}>
                  <Animated.View style={styles.animatedContainer}>
                    <View ref={imageRef} collapsable={false} style={{ width: '100%', height: '100%' }}>
                      {selectedImage ? (
                        <Image
                          source={{ uri: selectedImage }}
                          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                      ) : (
                        <Image
                          source={PlaceholderImage}
                          style={{ width: '100%', height: '100%' }}
                        />
                      )}
                      {pickedEmojis.map((item) => (
                        <TouchableOpacity key={item.id} onPress={() => removeSticker(item.id)}>
                          <EmojiSticker imageSize={40} stickerSource={item.emoji} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </Animated.View>
                </PanGestureHandler>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </TapGestureHandler>

        {/* Container du DrawingCanvas : il capte les touches uniquement en mode dessin */}
        <View style={StyleSheet.absoluteFill} pointerEvents={isDrawing ? 'auto' : 'none'}>
          <DrawingCanvas strokeColor="red" strokeWidth={5} enabled={isDrawing} />
        </View>
      </View>

      {/* Barre du bas */}
      {showAppOptions && (
        <View style={styles.footerContainer}>
          <IconButton
            icon="comment"
            label="Commentaire"
            onPress={() => Alert.alert("Commentaire", "Fonction à implémenter")}
          />
          <IconButton
            icon="help"
            label="Help"
            onPress={() => Alert.alert("Help", "Fonction à implémenter")}
          />
        </View>
      )}

      {/* Emoji Picker */}
      {isModalVisible && (
        <EmojiPicker isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
          <EmojiList onSelect={handleAddSticker} onCloseModal={() => setIsModalVisible(false)} />
        </EmojiPicker>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#25292e' },
  headerContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 10,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
  },
});
