import React, { useState, useMemo } from 'react';
import { View, StyleSheet, PanResponder, PanResponderInstance } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type DrawingCanvasProps = {
  isActive: boolean;
  paths: string[];
  setPaths: React.Dispatch<React.SetStateAction<string[]>>;
};

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ isActive, paths, setPaths }) => {
  const [currentPath, setCurrentPath] = useState<string>('');

  // Recréation du PanResponder à chaque changement de isActive ou currentPath
  const panResponder = useMemo<PanResponderInstance>(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => {
          console.log('onStartShouldSetPanResponder called, isActive:', isActive);
          return isActive;
        },
        onPanResponderGrant: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          console.log('onPanResponderGrant:', locationX, locationY);
          setCurrentPath(`M${locationX} ${locationY}`);
        },
        onPanResponderMove: (evt) => {
          const { locationX, locationY } = evt.nativeEvent;
          console.log('onPanResponderMove:', locationX, locationY);
          setCurrentPath((prev) => `${prev} L${locationX} ${locationY}`);
        },
        onPanResponderRelease: () => {
          console.log('onPanResponderRelease, currentPath:', currentPath);
          if (currentPath !== '') {
            setPaths((prev) => [...prev, currentPath]);
            setCurrentPath('');
          }
        },
      }),
    [isActive, currentPath, setPaths]
  );

  return (
    <View
      style={[StyleSheet.absoluteFill, styles.canvas]}
      {...(isActive ? panResponder.panHandlers : {})}
      collapsable={false}
    >
      <Svg style={{ flex: 1 }}>
        {paths.map((d, index) => (
          <Path key={index} d={d} stroke="red" strokeWidth={3} fill="none" />
        ))}
        {currentPath !== '' && (
          <Path d={currentPath} stroke="red" strokeWidth={3} fill="none" />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100, // Doit être au-dessus de l'image
    backgroundColor: 'transparent',
  },
});

export default DrawingCanvas;
