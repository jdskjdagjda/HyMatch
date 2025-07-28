import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Bell, Moon, Shield, HelpCircle, Info } from 'lucide-react-native';

type SwitchSetting = {
  type: 'switch';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
};

type LinkSetting = {
  type: 'link';
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
};

type SettingItem = SwitchSetting | LinkSetting;

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [notifications, setNotifications] = React.useState(true);
  const { isDarkMode, setTheme } = useTheme();

  const settingsSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Notifications',
      items: [
        {
          type: 'switch',
          icon: <Bell size={20} color="#3B82F6" />,
          title: 'Push Notifications',
          subtitle: 'Get notified about new jobs',
          value: notifications,
          onValueChange: setNotifications,
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          type: 'switch',
          icon: <Moon size={20} color="#3B82F6" />,
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          value: isDarkMode,
          onValueChange: (val: boolean) => setTheme(val ? 'dark' : 'light'),
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          type: 'link',
          icon: <Shield size={20} color="#3B82F6" />,
          title: 'Privacy Policy',
          subtitle: 'Read our privacy policy',
          onPress: () => console.log('Privacy Policy'),
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          type: 'link',
          icon: <HelpCircle size={20} color="#3B82F6" />,
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          onPress: () => router.push('/contact'),
        },
        {
          type: 'link',
          icon: <Info size={20} color="#3B82F6" />,
          title: 'About',
          subtitle: 'App version and information',
          onPress: () => console.log('About'),
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && { backgroundColor: '#18181b' }]}
    >
      <View
        style={[
          styles.header,
          isDarkMode && {
            backgroundColor: '#23233a',
            borderBottomColor: '#27272a',
          },
        ]}
      >
        <Text style={[styles.title, isDarkMode && { color: '#fff' }]}>
          Settings
        </Text>
        <TouchableOpacity
          style={[
            styles.closeButton,
            isDarkMode && { backgroundColor: '#23233a' },
          ]}
          onPress={() => router.back()}
        >
          <X size={24} color={isDarkMode ? '#fff' : '#6b7280'} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.content, isDarkMode && { backgroundColor: '#18181b' }]}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text
              style={[styles.sectionTitle, isDarkMode && { color: '#a1a1aa' }]}
            >
              {section.title}
            </Text>
            {section.items.map((item, itemIndex) => {
              if (item.type === 'switch') {
                return (
                  <View
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      isDarkMode && { backgroundColor: '#23233a' },
                    ]}
                  >
                    <View
                      style={[
                        styles.settingIcon,
                        isDarkMode && { backgroundColor: '#27272a' },
                      ]}
                    >
                      {item.icon}
                    </View>
                    <View style={styles.settingContent}>
                      <Text
                        style={[
                          styles.settingTitle,
                          isDarkMode && { color: '#fff' },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.settingSubtitle,
                          isDarkMode && { color: '#a1a1aa' },
                        ]}
                      >
                        {item.subtitle}
                      </Text>
                    </View>
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: '#27272a', true: '#a5b4fc' }}
                      thumbColor={isDarkMode ? '#fff' : '#ffffff'}
                    />
                  </View>
                );
              } else if (item.type === 'link') {
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      isDarkMode && { backgroundColor: '#23233a' },
                    ]}
                    onPress={item.onPress}
                  >
                    <View
                      style={[
                        styles.settingIcon,
                        isDarkMode && { backgroundColor: '#27272a' },
                      ]}
                    >
                      {item.icon}
                    </View>
                    <View style={styles.settingContent}>
                      <Text
                        style={[
                          styles.settingTitle,
                          isDarkMode && { color: '#fff' },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.settingSubtitle,
                          isDarkMode && { color: '#a1a1aa' },
                        ]}
                      >
                        {item.subtitle}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.chevron,
                        isDarkMode && { color: '#a1a1aa' },
                      ]}
                    >
                      ›
                    </Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
  chevron: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#9ca3af',
  },
});
