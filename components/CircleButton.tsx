// Importation des composants nécessaires depuis React Native et des icônes MaterialIcons depuis Expo
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

// Définition du type pour les propriétés du composant CircleButton
type Props = {
  // Fonction appelée lors de l'appui sur le bouton
  onPress: () => void;
};

// Composant fonctionnel CircleButton qui représente un bouton circulaire
export default function CircleButton({ onPress }: Props) {
  return (
    // Conteneur du bouton circulaire, permettant de gérer la taille et la bordure extérieure
    <View style={styles.circleButtonContainer}>
      {/* Composant Pressable pour gérer l'interaction tactile du bouton */}
      <Pressable style={styles.circleButton} onPress={onPress}>
        {/* Affichage de l'icône "add" avec la taille et la couleur spécifiées */}
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

// Définition des styles du composant à l'aide de StyleSheet.create
const styles = StyleSheet.create({
  // Style du conteneur extérieur du bouton circulaire
  circleButtonContainer: {
    width: 84,                // Largeur du conteneur
    height: 84,               // Hauteur du conteneur
    marginHorizontal: 60,     // Marge horizontale pour espacer le bouton
    borderWidth: 4,           // Épaisseur de la bordure
    borderColor: '#ffd33d',   // Couleur de la bordure (jaune)
    borderRadius: 42,         // Rayon de la bordure pour obtenir une forme circulaire
    padding: 3,               // Espacement intérieur entre la bordure et le bouton
  },
  // Style du bouton circulaire lui-même
  circleButton: {
    flex: 1,                  // Permet au bouton de prendre tout l'espace disponible dans le conteneur
    justifyContent: 'center', // Centre verticalement le contenu (l'icône)
    alignItems: 'center',     // Centre horizontalement le contenu (l'icône)
    borderRadius: 42,         // Rayon pour conserver la forme circulaire du bouton
    backgroundColor: '#fff',  // Couleur de fond blanche pour le bouton
  },
});
