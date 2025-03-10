import React from 'react';
import { StyleSheet, View, Pressable, Text, ViewStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ButtonProps = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
  containerStyle?: ViewStyle;
};

export default function Button({ label, theme, onPress, containerStyle }: ButtonProps) {
  if (theme === 'primary') {
    return (
      <View style={[styles.buttonContainer, containerStyle, { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 }]}>
        <Pressable style={[styles.button, { backgroundColor: '#fff' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
