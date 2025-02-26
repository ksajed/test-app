import React, { useState, useRef } from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface Point {
  x: number;
  y: number;
}

export interface DrawingCanvasProps {
  strokeColor?: string;
  strokeWidth?: number;
  enabled: boolean;
}

export default function DrawingCanvas({
  strokeColor = 'red',
  strokeWidth = 5,
  enabled,
}: DrawingCanvasProps) {
  const [paths, setPaths] = useState<Point[][]>([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);

  const convertPointsToSvgPath = (points: Point[]): string => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  // On capture les gestes de dessin uniquement si enabled est true
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
      onStartShouldSetResponder={() => enabled}
      onResponderGrant={panResponder.onResponderGrant}
      onResponderMove={panResponder.onResponderMove}
      onResponderRelease={panResponder.onResponderRelease}
    >
      <Svg style={StyleSheet.absoluteFill}>
        {paths.map((points, idx) => (
          <Path
            key={idx}
            d={convertPointsToSvgPath(points)}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ))}
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
