import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';

interface SwipeIndicatorProps {
  type: 'left' | 'right';
  style?: ViewStyle;
}

export function SwipeIndicator({ type, style }: SwipeIndicatorProps) {
  const isRight = type === 'right';

  return (
    <Animated.View
      style={[
        styles.container,
        isRight ? styles.rightContainer : styles.leftContainer,
        style,
      ]}
    >
      <View style={[
        styles.indicator,
        isRight ? styles.chooseIndicator : styles.refuseIndicator
      ]}>
        {isRight ? (
          <>
            <Check size={40} color="#4CAF50" strokeWidth={4} />
            <Text style={[styles.text, styles.chooseText]}>Choose!</Text>
          </>
        ) : (
          <>
            <X size={40} color="#FF4444" strokeWidth={4} />
            <Text style={[styles.text, styles.refuseText]}>Refusal</Text>
          </>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    zIndex: 10,
  },
  rightContainer: {
    right: 20,
    transform: [{ translateY: -50 }],
  },
  leftContainer: {
    left: 20,
    transform: [{ translateY: -50 }],
  },
  indicator: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  chooseIndicator: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    borderColor: '#4CAF50',
  },
  refuseIndicator: {
    backgroundColor: 'rgba(255, 68, 68, 0.9)',
    borderColor: '#FF4444',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
    textAlign: 'center',
  },
  chooseText: {
    color: '#FFF',
  },
  refuseText: {
    color: '#FFF',
  },
});