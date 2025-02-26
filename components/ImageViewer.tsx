import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function ImageViewer({ imgSource, selectedImage }) {
  const source = selectedImage ? { uri: selectedImage } : imgSource;
  return (
    <Image source={source} style={styles.image} resizeMode="contain" />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

