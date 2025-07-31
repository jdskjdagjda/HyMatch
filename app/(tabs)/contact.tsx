import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MessageCircle } from 'lucide-react-native';

export default function ContactScreen() {
  const { t } = useLanguage();

  const handleCall = () => {
    Linking.openURL('tel:+81-3-1234-5678');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@hymatch.jp');
  };

  const handleChat = () => {
    // Open chat support
    console.log('Open chat support');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('contact.title')}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Need help? Get in touch with our support team.
        </Text>

        <TouchableOpacity style={styles.contactOption} onPress={handleCall}>
          <View style={[styles.iconContainer, { backgroundColor: '#10B981' }]}>
            <Phone size={24} color="#ffffff" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>{t('contact.phone')}</Text>
            <Text style={styles.contactDetail}>+81-3-1234-5678</Text>
            <Text style={styles.contactHours}>Mon-Fri 9:00-18:00</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactOption} onPress={handleEmail}>
          <View style={[styles.iconContainer, { backgroundColor: '#3B82F6' }]}>
            <Mail size={24} color="#ffffff" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>{t('contact.email')}</Text>
            <Text style={styles.contactDetail}>support@hymatch.jp</Text>
            <Text style={styles.contactHours}>Response within 24 hours</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactOption} onPress={handleChat}>
          <View style={[styles.iconContainer, { backgroundColor: '#F59E0B' }]}>
            <MessageCircle size={24} color="#ffffff" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDetail}>Chat with our team</Text>
            <Text style={styles.contactHours}>Available 24/7</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  contactOption: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  contactDetail: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#3B82F6',
    marginBottom: 4,
  },
  contactHours: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
  },
});