import { Tabs } from 'expo-router';
import { Trash2, Briefcase, Award } from 'lucide-react-native';
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
          backgroundColor: isDarkMode ? '#18181b' : '#ffffff',
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
        tabBarActiveTintColor: isDarkMode ? '#a5b4fc' : '#667eea',
        tabBarInactiveTintColor: isDarkMode ? '#a1a1aa' : '#9ca3af',
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
            <Trash2 size={size - 2} color={color} strokeWidth={2.5} />
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
            <Award size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}
