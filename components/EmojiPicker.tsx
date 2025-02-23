// Importation des composants nécessaires depuis React Native et d'autres bibliothèques
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
// Importation de PropsWithChildren pour typer les propriétés qui incluent des enfants
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

// Définition du type des propriétés du composant EmojiPicker
// isVisible : détermine si la modal doit être affichée ou non
// onClose : fonction à appeler pour fermer la modal
// children : contenu à afficher à l'intérieur de la modal (via PropsWithChildren)
type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

// Composant fonctionnel EmojiPicker qui affiche une modal pour choisir un sticker
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    // Composant Modal de React Native avec animation "slide" et fond transparent
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      {/* Conteneur principal de la modal */}
      <View style={styles.modalContent}>
        {/* Conteneur du titre et du bouton de fermeture */}
        <View style={styles.titleContainer}>
          {/* Titre de la modal */}
          <Text style={styles.title}>Choose a sticker</Text>
          {/* Bouton permettant de fermer la modal */}
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {/* Affichage du contenu passé en enfants */}
        {children}
      </View>
    </Modal>
  );
}

// Définition des styles pour le composant EmojiPicker
const styles = StyleSheet.create({
  // Style du conteneur principal de la modal
  modalContent: {
    height: '25%',               // Hauteur de la modal par rapport à l'écran
    width: '100%',               // La modal occupe toute la largeur
    backgroundColor: '#25292e',  // Couleur de fond sombre
    borderTopRightRadius: 18,    // Arrondi en haut à droite
    borderTopLeftRadius: 18,     // Arrondi en haut à gauche
    position: 'absolute',        // Positionnement absolu pour l'ancrer en bas de l'écran
    bottom: 0,                   // Positionné en bas de l'écran
  },
  // Style du conteneur du titre et du bouton de fermeture
  titleContainer: {
    height: '16%',               // Hauteur du conteneur par rapport à la modal
    backgroundColor: '#464C55',  // Couleur de fond différente pour distinguer le titre
    borderTopRightRadius: 10,    // Arrondi en haut à droite
    borderTopLeftRadius: 10,     // Arrondi en haut à gauche
    paddingHorizontal: 20,       // Espacement horizontal interne
    flexDirection: 'row',        // Agencement en ligne (horizontal)
    alignItems: 'center',        // Alignement vertical centré
    justifyContent: 'space-between', // Espace entre le titre et le bouton de fermeture
  },
  // Style pour le texte du titre
  title: {
    color: '#fff',               // Couleur blanche pour le texte
    fontSize: 16,                // Taille de police du titre
  },
});
