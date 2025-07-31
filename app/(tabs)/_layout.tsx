import { Tabs } from 'expo-router';
import { Heart, Briefcase, X } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#D4A574',
          borderTopWidth: 0,
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 6,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 11,
          marginTop: 3,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarIconStyle: {
          marginBottom: 1,
        },
      }}
    >
      <Tabs.Screen
        name="refused"
        options={{
          title: t('tabs.refused'),
          tabBarIcon: ({ size, color }) => (
            <X size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.jobs'),
          tabBarIcon: ({ size, color }) => (
            <Briefcase size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="chosen"
        options={{
          title: t('tabs.chosen'),
          tabBarIcon: ({ size, color }) => (
            <Heart size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}