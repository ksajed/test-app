// Importation des composants et bibliothèques nécessaires
import { Pressable, StyleSheet, Text } from 'react-native'; // Composants de base de React Native
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Icônes de Material Icons via Expo
import React from 'react';

// Définition du type pour les propriétés du composant IconButton
type Props = {
  // Nom de l'icône à afficher (doit correspondre à une clé dans MaterialIcons.glyphMap)
  icon: keyof typeof MaterialIcons.glyphMap;
  // Libellé à afficher sous l'icône
  label: string;
  // Fonction appelée lors de l'appui sur le bouton
  onPress: () => void;
};

// Composant fonctionnel IconButton qui retourne un bouton avec une icône et un libellé
export default function IconButton({ icon, label, onPress }: Props) {
  return (
    // Composant pressable pour gérer les interactions tactiles
    <Pressable style={styles.iconButton} onPress={onPress}>
      {/* Affichage de l'icône avec les paramètres définis (taille et couleur) */}
      <MaterialIcons name={icon} size={24} color="#fff" />
      {/* Affichage du libellé sous l'icône */}
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

// Définition des styles pour le composant
const styles = StyleSheet.create({
  // Style pour le conteneur du bouton, centré horizontalement et verticalement
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style pour le texte du libellé du bouton, avec une marge en haut
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});
