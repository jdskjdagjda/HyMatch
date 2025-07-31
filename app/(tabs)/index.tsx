import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { SwipeCards } from '@/components/SwipeCards';
import { Menu, SlidersHorizontal } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Menu size={22} color="#666666" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              仕事一覧
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/filter')}
          >
            <SlidersHorizontal size={22} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
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
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#333333',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});