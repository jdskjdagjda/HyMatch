import { Tabs } from 'expo-router';
import { MessageCircle, Phone, Bookmark } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const { t } = useLanguage();

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
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Phone size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <Bookmark size={size - 2} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}