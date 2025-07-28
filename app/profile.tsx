import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'expo-router';
import { CreditCard as Edit, User as UserIcon, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const { t } = useLanguage();
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleDeleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setUser(null) },
      ]
    );
  };

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
          {t('tabs.profile')}
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
        {user ? (
          <View
            style={[
              styles.profileCard,
              isDarkMode && { backgroundColor: '#23233a' },
            ]}
          >
            <View style={styles.profileHeader}>
              {user.profilePicture ? (
                <Image
                  source={{ uri: user.profilePicture }}
                  style={styles.avatar}
                />
              ) : (
                <View
                  style={[
                    styles.avatarPlaceholder,
                    isDarkMode && { backgroundColor: '#27272a' },
                  ]}
                >
                  <UserIcon
                    size={32}
                    color={isDarkMode ? '#a1a1aa' : '#9ca3af'}
                  />
                </View>
              )}
              <Text style={[styles.name, isDarkMode && { color: '#fff' }]}>
                {user.firstName} {user.lastName}
              </Text>
              <Text
                style={[styles.details, isDarkMode && { color: '#a1a1aa' }]}
              >
                {user.age}歳 • {user.nationality}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text
                style={[styles.sectionTitle, isDarkMode && { color: '#fff' }]}
              >
                基本情報
              </Text>
              <View style={styles.infoRow}>
                <Text
                  style={[styles.infoLabel, isDarkMode && { color: '#a1a1aa' }]}
                >
                  メール:
                </Text>
                <Text
                  style={[styles.infoValue, isDarkMode && { color: '#fff' }]}
                >
                  {user.email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text
                  style={[styles.infoLabel, isDarkMode && { color: '#a1a1aa' }]}
                >
                  電話:
                </Text>
                <Text
                  style={[styles.infoValue, isDarkMode && { color: '#fff' }]}
                >
                  {user.phone}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text
                  style={[styles.infoLabel, isDarkMode && { color: '#a1a1aa' }]}
                >
                  日本語レベル:
                </Text>
                <Text
                  style={[styles.infoValue, isDarkMode && { color: '#fff' }]}
                >
                  {user.japaneseLevel}
                </Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text
                style={[styles.sectionTitle, isDarkMode && { color: '#fff' }]}
              >
                住所
              </Text>
              <Text
                style={[styles.address, isDarkMode && { color: '#a1a1aa' }]}
              >
                〒{user.postalCode}
                {'\n'}
                {user.prefecture} {user.city}
                {'\n'}
                {user.address}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  { flex: 1 },
                  isDarkMode && { backgroundColor: '#a5b4fc' },
                ]}
                onPress={() => router.push('/profile/edit')}
              >
                <Edit size={20} color={isDarkMode ? '#23233a' : '#ffffff'} />
                <Text
                  style={[
                    styles.editButtonText,
                    isDarkMode && { color: '#23233a' },
                  ]}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.editButton,
                  {
                    flex: 1,
                    backgroundColor: '#ef4444',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}
                onPress={handleDeleteProfile}
              >
                <X size={20} color="#fff" />
                <Text style={[styles.editButtonText, { color: '#fff' }]}>
                  Delete Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptyProfile}>
            <UserIcon size={64} color={isDarkMode ? '#a1a1aa' : '#9ca3af'} />
            <Text
              style={[styles.emptyText, isDarkMode && { color: '#a1a1aa' }]}
            >
              プロフィールを作成してください
            </Text>
            <TouchableOpacity
              style={[
                styles.createButton,
                isDarkMode && { backgroundColor: '#a5b4fc' },
              ]}
              onPress={() => router.push('/profile/edit')}
            >
              <Text
                style={[
                  styles.createButtonText,
                  isDarkMode && { color: '#23233a' },
                ]}
              >
                プロフィール作成
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
  },
  address: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    marginLeft: 8,
  },
  emptyProfile: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});
