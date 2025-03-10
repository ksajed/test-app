import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Share,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';

import Button from '@/components/Button';
import IconButton from '@/components/IconButton';

// Import des scripts depuis le fichier séparé
import { monitoringScripts } from '../data/monitoringScripts';
 
const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [showCommentPage, setShowCommentPage] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedScript, setSelectedScript] = useState<string>('');

  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  useEffect(() => {
    if (!status) {
      requestPermission();
    }
  }, [status]);

  // Valeurs partagées pour zoom et pan
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gestes pour zoom, pan et double tap
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.min(Math.max(savedScale.value * e.scale, 0.3), 3);
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      }
    })
    .onEnd((e) => {
      if (scale.value > 1) {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      }
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = withTiming(1);
      savedScale.value = 1;
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  const composedGesture = Gesture.Simultaneous(doubleTapGesture, pinchGesture, panGesture);
  const dummyGesture = Gesture.Tap().enabled(false);

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

  const onShareComment = async () => {
    if (!commentText.trim()) {
      Alert.alert("Aucun commentaire à partager.");
      return;
    }
    try {
      await Share.share({
        message: commentText,
      });
    } catch (error) {
      Alert.alert("Erreur de partage", (error as Error).message);
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
      mediaTypes: ['images'],
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
    scale.value = withTiming(1);
    savedScale.value = 1;
    translateX.value = withTiming(0);
    translateY.value = withTiming(0);
    setCommentText('');
    setSelectedScript('');
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

  const openCommentPage = () => {
    setShowCommentPage(true);
  };

  const closeCommentPage = () => {
    setShowCommentPage(false);
  };

  const handleScriptSelection = (value: string) => {
    setSelectedScript(value);
    setCommentText(value);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Barre du haut */}
      {!showAppOptions ? (
        <View style={styles.headerContainer}>
          <Button theme="primary" label="Select Image" onPress={pickImageAsync} />
          <Button theme="primary" label="Prendre une photo" onPress={pickImageFromCamera} />
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            <IconButton icon="share" label="Partager" onPress={onShare} />
          </>
        </View>
      )}

      {/* Zone principale : image */}
      <View style={styles.imageContainer}>
        <GestureDetector gesture={showAppOptions ? composedGesture : dummyGesture}>
          <Animated.View style={[styles.animatedContainer, animatedStyle]} ref={imageRef} collapsable={false}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <Image source={PlaceholderImage} style={styles.image} />
            )}
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Barre du bas avec le bouton "Commentaire" */}
      {showAppOptions && !showCommentPage && (
        <View style={styles.footerContainer}>
          <IconButton icon="message" label="Commentaire" onPress={openCommentPage} />
        </View>
      )}

      {/* Page de commentaire flottante */}
      {showCommentPage && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.commentOverlay}
        >
          <View style={styles.floatingCommentContainer}>
            <Text style={styles.commentTitle}>Commentaires</Text>
            <View style={styles.pickerContainer}>
              <Picker selectedValue={selectedScript} onValueChange={(itemValue) => handleScriptSelection(itemValue)}>
                <Picker.Item label="Sélectionnez un script" value="" />
                {monitoringScripts.map((script) => (
                  <Picker.Item label={script.label} value={script.value} key={script.label} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.commentInput}
              multiline
              placeholder="Saisissez votre commentaire ici..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <View style={styles.buttonRow}>
              <Button theme="primary" label="Partager" onPress={onShareComment} />
              <Button theme="primary" label="Quitter" onPress={closeCommentPage} />
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    zIndex: 10,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  animatedContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 10,
  },
  commentOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 20,
  },
  floatingCommentContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  commentTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  commentInput: {
    width: '100%',
    minHeight: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
