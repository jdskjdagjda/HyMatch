import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { X, User, Globe, LogOut } from 'lucide-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface HamburgerMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export function HamburgerMenu({ isVisible, onClose }: HamburgerMenuProps) {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { user } = useUser();

  const languages = [
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  ];

  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.8)).current;
  const [isMenuRendered, setIsMenuRendered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsMenuRendered(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH * 0.8,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setIsMenuRendered(false));
    }
  }, [isVisible]);

  const handleProfilePress = () => {
    onClose();
    router.push('/profile');
  };


  if (!isMenuRendered) {
    return null;
  }

  return (
    <View
      style={styles.absoluteFill}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={styles.overlay}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.menu,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.headerGradient}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
              <Text style={styles.title}>
                Menu
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
              >
                <X size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.userSection}>
              {user ? (
                <View style={styles.userInfo}>
                  <View
                    style={styles.avatarContainer}
                  >
                    <Text
                      style={styles.avatarText}
                    >
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </Text>
                  </View>
                  <Text
                    style={styles.userName}
                  >
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text
                    style={styles.userEmail}
                  >
                    {user.email}
                  </Text>
                </View>
              ) : (
                <View style={styles.guestSection}>
                  <View
                    style={styles.avatarContainer}
                  >
                    <User size={20} color="#ffffff" />
                  </View>
                  <Text
                    style={styles.guestText}
                  >
                    Guest User
                  </Text>
                </View>
              )}
            </View>
          </SafeAreaView>
        </View>

        <View
          style={styles.menuContent}
        >
          <View style={styles.menuItems}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleProfilePress}
            >
              <View
                style={styles.menuIconContainer}
              >
                <User size={18} color="#667eea" />
              </View>
              <Text
                style={styles.menuItemText}
              >
                {t('tabs.profile')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.languageSection}>
            <Text
              style={styles.sectionTitle}
            >
              Language
            </Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  language === lang.code && styles.languageOptionActive,
                ]}
                onPress={() => setLanguage(lang.code as any)}
              >
                <Text style={styles.languageFlag}>{lang.flag}</Text>
                <Text
                  style={[
                    styles.languageName,
                    language === lang.code && styles.languageNameActive,
                  ]}
                >
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <View
                    style={styles.languageCheck}
                  >
                    <Text
                      style={styles.checkmark}
                    >
                      ✓
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.logoutButton}
            >
              <LogOut size={18} color="#EF4444" />
              <Text
                style={styles.logoutText}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  menu: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: '80%',
    maxWidth: 300,
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  headerGradient: {
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  userEmail: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#e0e7ff',
  },
  guestSection: {
    alignItems: 'center',
  },
  guestText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#e0e7ff',
    marginTop: 6,
  },
  menuContent: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
  },
  menuItems: {
    paddingHorizontal: 20,
    marginBottom: 24,
    paddingTop: 35,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1f2937',
  },
  languageSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageOptionActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1.5,
    borderColor: '#667eea',
  },
  languageFlag: {
    fontSize: 18,
    marginRight: 12,
  },
  languageName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    flex: 1,
  },
  languageNameActive: {
    color: '#667eea',
    fontFamily: 'Inter-SemiBold',
  },
  languageCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Inter-Bold',
  },
  bottomSection: {
    marginTop: 'auto',
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#EF4444',
    marginLeft: 10,
  },
});
