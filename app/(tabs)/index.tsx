import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  TextInput, 
  Modal, 
  Text, 
  Pressable,
  Share
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { type ImageSource } from 'expo-image';
import Animated, { 
  useSharedValue, 
  useAnimatedGestureHandler, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmojis, setPickedEmojis] = useState<{ id: number; emoji: ImageSource }[]>([]);
  const [comment, setComment] = useState<string>('');
  
  // Liste des phrases pour le monitoring fœtal avec valeurs normales intégrées
  const phrases = [
    `Cas normal complet :
« La fréquence cardiaque fœtale (FCF) est de 140 bpm (normale : 110–160 bpm), la variabilité oscille entre 10 et 20 bpm (normale : 10–25 bpm), des accélérations réactives d’au moins 15 bpm au-dessus du baseline pendant 15 secondes ou plus (critère normal) sont présentes, aucune décélération n’est notée, et les contractions utérines surviennent toutes les 3–4 minutes pour une durée d’environ 40–60 secondes (norme). »`,
    
    `Tachycardie fœtale avec variabilité normale :
« Le tracé révèle une FCF à 165 bpm (légèrement supérieure à la normale 110–160 bpm) accompagnée d’une variabilité à 15 bpm (normale : 10–25 bpm) et des accélérations réactives conformes, suggérant une tachycardie isolée. »`,
    
    `Tachycardie fœtale avec variabilité réduite :
« La FCF est élevée à 170 bpm (au-dessus du seuil normal de 160 bpm) mais la variabilité est inférieure à 5 bpm (normale : 10–25 bpm) et les accélérations sont absentes, pouvant indiquer une hypoxie ou un stress fœtal important. »`,
    
    `Bradycardie fœtale persistante :
« La fréquence reste inférieure à 110 bpm (en dessous de la normale 110–160 bpm) de façon soutenue, associée à une variabilité réduite (<5 bpm) et à l’absence d’accélérations, signe d’une détresse fœtale sévère. »`,
    
    `Bradycardie fœtale transitoire :
« Un épisode bref affiche une FCF à 105 bpm (normale : 110–160 bpm), rapidement corrigé après un ajustement de la position maternelle, suivi d’un retour à 140 bpm avec une variabilité adéquate (10–25 bpm). »`,
    
    `Variabilité adéquate isolée :
« La FCF est normale (environ 140 bpm) avec une variabilité régulière comprise entre 10 et 20 bpm (normale : 10–25 bpm), même si les accélérations restent peu fréquentes. »`,
    
    `Variabilité réduite isolée :
« Malgré une FCF normale (≈140 bpm), la variabilité est inférieure à 5 bpm (contre 10–25 bpm normalement attendus), nécessitant une surveillance rapprochée pour détecter une éventuelle détresse. »`,
    
    `Variabilité excessive :
« La FCF est normale à 140 bpm, mais la variabilité dépasse 25 bpm, ce qui est inhabituel et demande une interprétation prudente dans le contexte clinique. »`,
    
    `Accélérations réactives :
« Des accélérations d’une amplitude d’au moins 15 bpm au-dessus de la ligne de base et durant 15 secondes ou plus (selon le critère normal) sont clairement identifiées, témoignant d’un bon bien-être fœtal. »`,
    
    `Absence d’accélérations en contexte de sommeil fœtal :
« La FCF est de 135 bpm avec une variabilité adéquate (10–25 bpm), mais aucune accélération n’est observée sur une période prolongée, ce qui est compatible avec un état de sommeil fœtal. »`,
    
    `Accélérations faibles ou insuffisantes :
« Bien que la FCF soit normale, les accélérations observées n’atteignent pas l’amplitude de 15 bpm ou ne durent pas 15 secondes (critère normal), ce qui nécessite une surveillance étroite. »`,
    
    `Décélérations précoces isolées :
« Des décélérations débutant simultanément aux contractions (qui interviennent normalement toutes les 3–4 minutes pour une durée de 40–60 secondes) sont relevées, généralement dues à une compression de la tête et considérées comme bénignes. »`,
    
    `Décélérations variables isolées :
« Le tracé présente des décélérations de forme irrégulière, non répétitives, souvent dues à une compression cordonique, sans perturber la FCF normale (110–160 bpm). »`,
    
    `Décélérations variables répétées :
« Des décélérations variables apparaissent de façon répétée lors des contractions (normales : intervalles de 3–4 minutes, durée 40–60 secondes), suggérant une compression cordonique récurrente à surveiller. »`,
    
    `Décélérations tardives répétées :
« Les décélérations débutent après le pic de contraction et se répètent de manière régulière, indiquant une insuffisance utéroplacentaire (décélérations tardives anormales en décalage par rapport aux contractions normales). »`,
    
    `Décélérations prolongées :
« Des décélérations d’une durée supérieure à 2 minutes sont observées, bien au-delà de la brièveté attendue en cas de décélérations normales, traduisant une détresse fœtale grave. »`,
    
    `Décélérations tardives associées à une bradycardie :
« La FCF chute en dessous de 110 bpm (normale : 110–160 bpm) lors de décélérations tardives répétées, signe d’une détresse fœtale avancée. »`,
    
    `Hyperstimulation utérine :
« Les contractions surviennent à des intervalles inférieurs à 2 minutes (alors que la norme est de 3–4 minutes) et sont parfois associées à des décélérations, ce qui peut compromettre l’oxygénation fœtale. »`,
    
    `Contractions insuffisantes :
« Les contractions utérines se produisent de façon trop espacée par rapport à la norme (attendues toutes les 3–4 minutes avec une durée de 40–60 secondes), ce qui peut ralentir le travail malgré une FCF normale. »`,
    
    `Modification liée à l’administration d’oxytocine :
« Après l’administration d’oxytocine, la FCF s’élève temporairement à 160 bpm (à la limite supérieure du normal 110–160 bpm), avec des contractions plus fréquentes et des accélérations moins marquées, invitant à réévaluer le dosage. »`,
    
    `Variabilité intermittente :
« Le tracé alterne entre des phases avec une variabilité adéquate (10–25 bpm) et des phases où la variabilité chute en dessous de 5 bpm, ce qui demande une observation continue pour détecter toute évolution défavorable. »`,
    
    `Décélérations tardives intermittentes avec variabilité fluctuante :
« Des décélérations tardives apparaissent de manière intermittente, accompagnées d’une variabilité oscillant entre 8 et 18 bpm (la norme étant 10–25 bpm), suggérant une insuffisance utéroplacentaire partielle. »`,
    
    `Tracé perturbé par des artefacts :
« Des irrégularités dues à des artefacts techniques ou des mouvements maternels altèrent l’interprétation du tracé, rendant difficile l’évaluation de la FCF normale (110–160 bpm) et de la variabilité (10–25 bpm). »`,
    
    `Cas évolutif (détérioration progressive) :
« Initialement, la FCF est normale (≈140 bpm) avec une variabilité de 15 bpm (normale : 10–25 bpm), mais le tracé évolue progressivement vers une diminution de la variabilité et l’apparition répétée de décélérations tardives, indiquant une détresse fœtale en développement. »`,
    
    `Réaction post-contraction (overshoot) :
« Après une décélération, la FCF présente une accélération marquée (amplitude ≥15 bpm pendant ≥15 secondes, conforme aux critères normaux) en signe de réponse réflexe de récupération. »`
  ];
  
  const [selectedPhrase, setSelectedPhrase] = useState<string>(phrases[0]);
  
  // États pour la fenêtre modale de détail
  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [detailText, setDetailText] = useState<string>('');
  
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  // Demande la permission au montage du composant
  useEffect(() => {
    if (!status) {
      requestPermission();
    }
  }, [status]);
  
  // Fonction de partage via l'API native
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Partager l'image",
        message: `${comment}\n\n${selectedImage || ''}`,
        url: selectedImage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Partagé avec l’activité:', result.activityType);
        } else {
          console.log('Partage réussi');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Partage annulé');
      }
    } catch (error) {
      Alert.alert('Erreur de partage', error.message);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
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
    setComment('');
    setSelectedPhrase(phrases[0]);
  };

  const onAddSticker = () => {
    if (pickedEmojis.length > 0) {
      setPickedEmojis([]);
      setTimeout(() => setIsModalVisible(true), 100);
    } else {
      setIsModalVisible(true);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAddSticker = (emoji: ImageSource) => {
    setPickedEmojis(prev => [...prev, { id: Date.now(), emoji }]);
    onModalClose();
  };

  const removeSticker = (id: number) => {
    setPickedEmojis(prev => prev.filter(item => item.id !== id));
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });
      // Ici, à la place d'enregistrer, vous pouvez appeler onShare si vous préférez partager
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        Alert.alert('Image sauvegardée !');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Valeurs partagées pour la translation de la zone de commentaire
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    },
  });

  const commentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // Fonction pour afficher la zone de détail lors de la sélection d'un élément de la liste
  const showDetail = (text: string) => {
    setDetailText(text);
    setDetailVisible(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Conteneur de l'image */}
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmojis.map(item => (
            <TouchableOpacity key={item.id} onPress={() => removeSticker(item.id)}>
              <EmojiSticker imageSize={40} stickerSource={item.emoji} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Zone en bas de l'image pour le commentaire et la liste */}
      {showAppOptions && (
        <View style={styles.bottomContainer}>
          <PanGestureHandler onGestureEvent={panGestureEvent}>
            <Animated.View style={[styles.commentContainer, commentAnimatedStyle]}>
              <TextInput
                style={styles.commentInput}
                placeholder="Écrivez un commentaire pour la photo..."
                value={comment}
                onChangeText={setComment}
                multiline
              />
            </Animated.View>
          </PanGestureHandler>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedPhrase}
              onValueChange={(itemValue) => {
                setSelectedPhrase(itemValue);
                showDetail(itemValue);
              }}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {phrases.map((phrase, index) => (
                <Picker.Item key={index} label={phrase.substring(0, 30) + '...'} value={phrase} />
              ))}
            </Picker>
          </View>
        </View>
      )}
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            <IconButton icon="share" label="Partager" onPress={onShare} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choisir une photo" onPress={pickImageAsync} />
          <Button theme="primary" label="Prendre une photo" onPress={pickImageFromCamera} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={handleAddSticker} onCloseModal={onModalClose} />
      </EmojiPicker>
      {/* Fenêtre modale pour afficher le détail de la phrase sélectionnée */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailVisible}
        onRequestClose={() => setDetailVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{detailText}</Text>
            <Pressable style={styles.buttonClose} onPress={() => setDetailVisible(false)}>
              <Text style={styles.textStyle}>Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
  },
  // Zone de commentaire : maintenant positionnée dans le conteneur bottomContainer (positionnement relatif)
  commentContainer: {
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  commentInput: {
    height: 50,
    color: '#000',
  },
  // Conteneur du Picker avec positionnement relatif
  pickerContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  pickerItem: {
    height: 50,
  },
  // Nouveau conteneur pour placer le commentaire et la liste en bas de l'image
  bottomContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 150,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  // Styles pour la modal de détail
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
