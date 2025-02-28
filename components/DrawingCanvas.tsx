import React, { useState, useRef } from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * Décrit un point (x, y).
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Propriétés acceptées par le composant DrawingCanvas.
 */
export interface DrawingCanvasProps {
  strokeColor?: string;   // Couleur du trait
  strokeWidth?: number;   // Épaisseur du trait
  enabled: boolean;       // Active ou désactive la capture des gestes
}

/**
 * Composant DrawingCanvas : permet de dessiner en capturant les événements tactiles
 * et en rendant des <Path> dans un <Svg>.
 */
export default function DrawingCanvas({
  strokeColor = 'red',
  strokeWidth = 5,
  enabled,
}: DrawingCanvasProps) {
  const [paths, setPaths] = useState<Point[][]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);

  // Convertit un tableau de points en un chemin SVG (M x y, L x y, etc.)
  const convertPointsToSvgPath = (points: Point[]): string => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  // Gestionnaires de gestes pour démarrer, continuer et terminer le tracé
  const panResponder = useRef({
    onStartShouldSetResponder: () => enabled,
    onResponderGrant: (evt: GestureResponderEvent) => {
      if (!enabled) return;
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath([{ x: locationX, y: locationY }]);
    },
    onResponderMove: (evt: GestureResponderEvent) => {
      if (!enabled) return;
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath((prev) => [...prev, { x: locationX, y: locationY }]);
    },
    onResponderRelease: () => {
      if (!enabled) return;
      const newPath = [...currentPath];
      // Si on n'a qu'un seul point, on le duplique pour que le trait soit visible
      if (newPath.length === 1) {
        newPath.push({ ...newPath[0] });
      }
      setPaths((prev) => [...prev, newPath]);
      setCurrentPath([]);
    },
  }).current;

  return (
    <View
      style={styles.canvasContainer}
      onStartShouldSetResponder={panResponder.onStartShouldSetResponder}
      onResponderGrant={panResponder.onResponderGrant}
      onResponderMove={panResponder.onResponderMove}
      onResponderRelease={panResponder.onResponderRelease}
    >
      <Svg style={StyleSheet.absoluteFill}>
        {/* Affiche tous les tracés déjà finalisés */}
        {paths.map((points, idx) => (
          <Path
            key={idx}
            d={convertPointsToSvgPath(points)}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ))}
        {/* Affiche le tracé en cours (celui qu'on est en train de dessiner) */}
        {currentPath.length > 0 && (
          <Path
            d={convertPointsToSvgPath(currentPath)}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
});
