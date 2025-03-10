import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type CommentOverlayProps = {
  comment: string;
  setComment: (text: string) => void;
};

const CommentOverlay: React.FC<CommentOverlayProps> = ({ comment, setComment }) => {
  // État local pour gérer le mode édition
  const [isEditing, setIsEditing] = useState(false);

  // Valeurs partagées pour la position de l'overlay
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Gestionnaire de geste pour déplacer l'overlay via la poignée
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
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

  // Style animé qui applique la translation à la vue
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value }
    ],
  }));

  return (
    <Animated.View style={[styles.overlay, animatedStyle]}>
      {/* Poignée dédiée au déplacement */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.handleContainer}>
          <View style={styles.handleBar} />
        </Animated.View>
      </PanGestureHandler>
      {/* Affichage conditionnel en fonction du mode édition */}
      {isEditing ? (
        <TextInput
          style={[styles.input, styles.inputContainer]}
          placeholder="Entrez votre commentaire..."
          placeholderTextColor="#ccc"
          value={comment}
          onChangeText={setComment}
          multiline
          autoFocus
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <TouchableOpacity style={styles.inputContainer} onPress={() => setIsEditing(true)}>
          <Text style={styles.inputText}>
            {comment || "Entrez votre commentaire..."}
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 250,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  handleContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  handleBar: {
    width: 50,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    minHeight: 40,
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
    minHeight: 40,
  },
});

export default CommentOverlay;
