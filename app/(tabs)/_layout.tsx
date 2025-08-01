import { Tabs } from 'expo-router';
import { MessageCircle, Phone, FileText } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { View } from 'react-native';

export default function TabLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#C8A882',
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 0,
          height: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.8)',
        tabBarIconStyle: {
          marginBottom: 0,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <View style={{
              backgroundColor: '#4A9EFF',
              borderRadius: 20,
              padding: 8,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MessageCircle size={24} color="#FFFFFF" strokeWidth={2} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <View style={{
              backgroundColor: '#4A9EFF',
              borderRadius: 8,
              padding: 8,
              width: 80,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
              <Phone size={20} color="#FFFFFF" strokeWidth={2} style={{ marginRight: 4 }} />
              <View style={{
                backgroundColor: '#FFD700',
                borderRadius: 4,
                width: 24,
                height: 16,
              }} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: '',
          tabBarIcon: ({ size, color }) => (
            <View style={{
              backgroundColor: '#FF69B4',
              borderRadius: 8,
              padding: 8,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FileText size={20} color="#FFFFFF" strokeWidth={2} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}