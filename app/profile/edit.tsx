import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@/contexts/UserContext';
import { User } from '@/types/User';
import {
  X,
  Camera,
  User as UserIcon,
  Mail,
  Settings,
  Star,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditProfileModal() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { theme, isDarkMode } = useTheme();

  const colors = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    card: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e5e7eb',
    textPrimary: theme === 'dark' ? '#f1f5f9' : '#1f2937',
    textSecondary: theme === 'dark' ? '#94a3b8' : '#6b7280',
    inputBackground: theme === 'dark' ? '#1e293b' : '#ffffff',
    inputText: theme === 'dark' ? '#f8fafc' : '#1f2937',
    placeholder: theme === 'dark' ? '#64748b' : '#6b7280',
    segmentActiveBg: theme === 'dark' ? '#334155' : '#ffffff',
    segmentInactiveText: theme === 'dark' ? '#94a3b8' : '#6b7280',
    segmentActiveText: theme === 'dark' ? '#f8fafc' : '#1f2937',
    gridOptionBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    gridOptionText: theme === 'dark' ? '#e2e8f0' : '#374151',
    gridOptionSelectedBg: theme === 'dark' ? '#1d4ed8' : '#eff6ff',
    gridOptionSelectedText: theme === 'dark' ? '#f8fafc' : '#3B82F6',
    accent: '#3B82F6',
    accentBg: theme === 'dark' ? '#1d4ed8' : '#eff6ff',
    icon: theme === 'dark' ? '#94a3b8' : '#6b7280',
  };

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.textPrimary,
      letterSpacing: 0.5,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    content: { flex: 1, padding: 20 },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      marginBottom: 28,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 8,
      elevation: 3,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.textPrimary,
    },
    photoSection: { alignItems: 'center', marginBottom: 24 },
    photoButton: {
      width: 110,
      height: 110,
      borderRadius: 55,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
      marginBottom: 8,
    },
    cameraOverlay: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      backgroundColor: colors.accent,
      borderRadius: 16,
      padding: 4,
      zIndex: 2,
    },
    photoButtonText: {
      fontSize: 13,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginTop: 4,
    },
    label: {
      fontSize: 15,
      fontFamily: 'Inter-SemiBold',
      color: colors.textPrimary,
      marginBottom: 8,
      marginTop: 8,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderWidth: 0,
      borderRadius: 12,
      paddingHorizontal: 18,
      paddingVertical: 14,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.inputText,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    row: { flexDirection: 'row', gap: 12 },
    halfInput: { flex: 1 },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      padding: 4,
      marginBottom: 12,
      marginTop: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
      elevation: 1,
    },
    segment: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 8,
    },
    segmentActive: { backgroundColor: colors.accentBg },
    segmentText: {
      fontSize: 13.5,
      fontFamily: 'Inter-Medium',
      color: colors.segmentInactiveText,
      textTransform: 'capitalize',
    },
    segmentTextActive: {
      color: colors.segmentActiveText,
      fontFamily: 'Inter-SemiBold',
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 8,
      marginTop: 2,
    },
    gridOption: {
      backgroundColor: colors.gridOptionBg,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 6,
    },
    gridOptionSelected: {
      backgroundColor: colors.gridOptionSelectedBg,
      borderColor: colors.gridOptionSelectedText,
    },
    gridOptionText: {
      fontSize: 15,
      fontFamily: 'Inter-Medium',
      color: colors.gridOptionText,
      textTransform: 'capitalize',
    },
    gridOptionTextSelected: {
      color: colors.gridOptionSelectedText,
      fontFamily: 'Inter-SemiBold',
    },
    footer: {
      padding: 20,
      backgroundColor: 'transparent',
    },
    saveButton: {
      backgroundColor: colors.accent,
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: '#ffffff',
    },
  });

  const [formData, setFormData] = useState<Partial<User>>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || 20,
    gender: user?.gender || 'male',
    nationality: user?.nationality || '',
    email: user?.email || '',
    phone: user?.phone || '',
    japaneseLevel: user?.japaneseLevel || 'N5',
    nearestStationHome: user?.nearestStationHome || '',
    walkTimeHome: user?.walkTimeHome || 5,
    nearestStationSchool: user?.nearestStationSchool || '',
    walkTimeSchool: user?.walkTimeSchool || 5,
    postalCode: user?.postalCode || '',
    prefecture: user?.prefecture || '',
    city: user?.city || '',
    address: user?.address || '',
    visaType: user?.visaType || '',
    preferredDays: user?.preferredDays || [],
    preferredJobTypes: user?.preferredJobTypes || [],
    workExperience: user?.workExperience || '',
  });

  const handleSave = () => {
    const requiredFields: (keyof User)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newUser: User = {
      ...(formData as User),
      id: user?.id || Date.now().toString(),
      isProfileComplete: true,
    };

    setUser(newUser);
    router.back();
  };

  const genders = ['male', 'female', 'other'];
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const jobTypes = [
    'cooking',
    'delivery',
    'warehouse',
    'cleaning',
    'retail',
    'restaurant',
    'office',
    'construction',
  ];

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredDays: prev.preferredDays?.includes(day)
        ? prev.preferredDays.filter((d) => d !== day)
        : [...(prev.preferredDays || []), day],
    }));
  };

  const toggleJobType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      preferredJobTypes: prev.preferredJobTypes?.includes(type)
        ? prev.preferredJobTypes.filter((t) => t !== type)
        : [...(prev.preferredJobTypes || []), type],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <UserIcon size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>
          <View style={styles.photoSection}>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity style={styles.photoButton}>
                <Image
                  source={require('../../../project/assets/images/icon.png')}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <View style={styles.cameraOverlay}>
                  <Camera size={18} color={'#fff'} />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.photoButtonText}>Add Photo</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, firstName: text }))
                }
                placeholder="Enter first name"
                placeholderTextColor={colors.placeholder}
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, lastName: text }))
                }
                placeholder="Enter last name"
                placeholderTextColor={colors.placeholder}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={formData.age?.toString()}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    age: parseInt(text) || 20,
                  }))
                }
                placeholder="Age"
                placeholderTextColor={colors.placeholder}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.segmentedControl}>
                {genders.map((gender) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.segment,
                      formData.gender === gender && styles.segmentActive,
                    ]}
                    onPress={() =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: gender as any,
                      }))
                    }
                  >
                    <Text
                      style={[
                        styles.segmentText,
                        formData.gender === gender && styles.segmentTextActive,
                      ]}
                    >
                      {gender}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <Text style={styles.label}>Nationality</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, nationality: text }))
            }
            placeholder="Enter nationality"
            placeholderTextColor={colors.placeholder}
          />
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Mail size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Contact Information</Text>
          </View>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            placeholder="Enter email"
            placeholderTextColor={colors.placeholder}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, phone: text }))
            }
            placeholder="Enter phone number"
            placeholderTextColor={colors.placeholder}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.sectionTitleRow}>
            <Settings size={20} color={colors.accent} />
            <Text style={styles.sectionTitle}>Work Preferences</Text>
          </View>
          <Text style={styles.label}>Japanese Level</Text>
          <View style={styles.segmentedControl}>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.segment,
                  formData.japaneseLevel === level && styles.segmentActive,
                ]}
                onPress={() =>
                  setFormData((prev) => ({
                    ...prev,
                    japaneseLevel: level as any,
                  }))
                }
              >
                <Text
                  style={[
                    styles.segmentText,
                    formData.japaneseLevel === level &&
                      styles.segmentTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Preferred Work Days</Text>
          <View style={styles.optionsGrid}>
            {workDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.gridOption,
                  formData.preferredDays?.includes(day) &&
                    styles.gridOptionSelected,
                ]}
                onPress={() => toggleDay(day)}
              >
                <Text
                  style={[
                    styles.gridOptionText,
                    formData.preferredDays?.includes(day) &&
                      styles.gridOptionTextSelected,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Preferred Job Types</Text>
          <View style={styles.optionsGrid}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.gridOption,
                  formData.preferredJobTypes?.includes(type) &&
                    styles.gridOptionSelected,
                ]}
                onPress={() => toggleJobType(type)}
              >
                <Text
                  style={[
                    styles.gridOptionText,
                    formData.preferredJobTypes?.includes(type) &&
                      styles.gridOptionTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[colors.accent, '#60a5fa']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
