import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface WorkDayBadgeProps {
  day: string;
  size?: 'small' | 'normal';
}

export function WorkDayBadge({ day, size = 'normal' }: WorkDayBadgeProps) {
  const { isDarkMode } = useTheme();
  const isWeekend = day === 'Sat' || day === 'Sun';
  const isSmall = size === 'small';

  const getGradientColors = () => {
    if (isWeekend) {
      return isDarkMode ? ['#7f1d1d', '#991b1b'] : ['#FEE2E2', '#FECACA'];
    }
    return isDarkMode ? ['#23233a', '#18181b'] : ['#EEF2FF', '#E0E7FF'];
  };

  const getTextColor = () => {
    if (isWeekend) {
      return isDarkMode ? '#f87171' : '#DC2626';
    }
    return isDarkMode ? '#a5b4fc' : '#4F46E5';
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.badge, isSmall && styles.smallBadge]}
    >
      <Text
        style={[
          styles.text,
          isSmall && styles.smallText,
          { color: getTextColor() },
        ]}
      >
        {day}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 11,
  },
});
