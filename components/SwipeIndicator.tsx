import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
      <LinearGradient
        colors={isRight ? ['#10B981', '#059669'] : ['#EF4444', '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {isRight ? (
          <Check size={28} color="#ffffff" strokeWidth={3} />
        ) : (
          <X size={28} color="#ffffff" strokeWidth={3} />
        )}
        <Text style={styles.text}>{isRight ? 'CHOOSE' : 'REFUSE'}</Text>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  rightContainer: {
    transform: [{ rotate: '15deg' }],
  },
  leftContainer: {
    transform: [{ rotate: '-15deg' }],
  },
  gradient: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
