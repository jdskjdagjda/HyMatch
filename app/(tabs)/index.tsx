import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { SwipeCards } from '@/components/SwipeCards';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu, SlidersHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProfileIncompleteModal } from '@/components/ProfileIncompleteModal';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && { backgroundColor: '#18181b' }]}
    >
      <LinearGradient
        colors={isDarkMode ? ['#23233a', '#18181b'] : ['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Menu size={22} color="#ffffff" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={[styles.title, isDarkMode && { color: '#fff' }]}>
              {t('app.title')}
            </Text>
            <View
              style={[
                styles.titleUnderline,
                isDarkMode && { backgroundColor: '#fff' },
              ]}
            />
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/filter')}
          >
            <SlidersHorizontal size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View
        style={[styles.content, isDarkMode && { backgroundColor: '#18181b' }]}
      >
        <SwipeCards />
      </View>

      <HamburgerMenu
        isVisible={isMenuVisible}
        onClose={() => setIsMenuVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.8,
  },
  titleUnderline: {
    width: 50,
    height: 2.5,
    backgroundColor: '#ffffff',
    borderRadius: 1.5,
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
