import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useJobs, JobFilters, SortOption } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Check } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function FilterModal() {
  const router = useRouter();
  const { filters, setFilters, sortBy, setSortBy } = useJobs();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);
  const [localSortBy, setLocalSortBy] = useState<SortOption>(sortBy);

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
  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const workDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'wage', label: t('sort.wage') },
    { key: 'commute', label: t('sort.commute') },
    { key: 'date', label: t('sort.date') },
  ];

  const handleApply = () => {
    setFilters(localFilters);
    setSortBy(localSortBy);
    router.back();
  };

  const handleReset = () => {
    const resetFilters: JobFilters = {
      jobTypes: [],
      wageRange: [0, 5000],
      japaneseLevels: [],
      workDays: [],
    };
    setLocalFilters(resetFilters);
    setLocalSortBy('date');
  };

  const toggleJobType = (type: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter((t) => t !== type)
        : [...prev.jobTypes, type],
    }));
  };

  const toggleJapaneseLevel = (level: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      japaneseLevels: prev.japaneseLevels.includes(level)
        ? prev.japaneseLevels.filter((l) => l !== level)
        : [...prev.japaneseLevels, level],
    }));
  };

  const toggleWorkDay = (day: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      workDays: prev.workDays.includes(day)
        ? prev.workDays.filter((d) => d !== day)
        : [...prev.workDays, day],
    }));
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
          {t('filter.title')}
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
        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDarkMode && { color: '#a1a1aa' }]}
          >
            Sort By
          </Text>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.option,
                localSortBy === option.key && styles.optionSelected,
                isDarkMode && { backgroundColor: '#23233a' },
                isDarkMode &&
                  localSortBy === option.key && { borderColor: '#a5b4fc' },
              ]}
              onPress={() => setLocalSortBy(option.key)}
            >
              <Text
                style={[
                  styles.optionText,
                  localSortBy === option.key && styles.optionTextSelected,
                  isDarkMode && { color: '#fff' },
                  isDarkMode &&
                    localSortBy === option.key && { color: '#a5b4fc' },
                ]}
              >
                {option.label}
              </Text>
              {localSortBy === option.key && (
                <Check size={20} color={isDarkMode ? '#a5b4fc' : '#3B82F6'} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDarkMode && { color: '#a1a1aa' }]}
          >
            {t('filter.jobType')}
          </Text>
          <View style={styles.optionsGrid}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.gridOption,
                  localFilters.jobTypes.includes(type) &&
                    styles.gridOptionSelected,
                  isDarkMode && { backgroundColor: '#23233a' },
                  isDarkMode &&
                    localFilters.jobTypes.includes(type) && {
                      borderColor: '#a5b4fc',
                    },
                ]}
                onPress={() => toggleJobType(type)}
              >
                <Text
                  style={[
                    styles.gridOptionText,
                    localFilters.jobTypes.includes(type) &&
                      styles.gridOptionTextSelected,
                    isDarkMode && { color: '#fff' },
                    isDarkMode &&
                      localFilters.jobTypes.includes(type) && {
                        color: '#a5b4fc',
                      },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDarkMode && { color: '#a1a1aa' }]}
          >
            {t('filter.japanese')}
          </Text>
          <View style={styles.optionsGrid}>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.gridOption,
                  localFilters.japaneseLevels.includes(level) &&
                    styles.gridOptionSelected,
                  isDarkMode && { backgroundColor: '#23233a' },
                  isDarkMode &&
                    localFilters.japaneseLevels.includes(level) && {
                      borderColor: '#a5b4fc',
                    },
                ]}
                onPress={() => toggleJapaneseLevel(level)}
              >
                <Text
                  style={[
                    styles.gridOptionText,
                    localFilters.japaneseLevels.includes(level) &&
                      styles.gridOptionTextSelected,
                    isDarkMode && { color: '#fff' },
                    isDarkMode &&
                      localFilters.japaneseLevels.includes(level) && {
                        color: '#a5b4fc',
                      },
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[styles.sectionTitle, isDarkMode && { color: '#a1a1aa' }]}
          >
            {t('filter.workDays')}
          </Text>
          <View style={styles.optionsGrid}>
            {workDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.gridOption,
                  localFilters.workDays.includes(day) &&
                    styles.gridOptionSelected,
                  isDarkMode && { backgroundColor: '#23233a' },
                  isDarkMode &&
                    localFilters.workDays.includes(day) && {
                      borderColor: '#a5b4fc',
                    },
                ]}
                onPress={() => toggleWorkDay(day)}
              >
                <Text
                  style={[
                    styles.gridOptionText,
                    localFilters.workDays.includes(day) &&
                      styles.gridOptionTextSelected,
                    isDarkMode && { color: '#fff' },
                    isDarkMode &&
                      localFilters.workDays.includes(day) && {
                        color: '#a5b4fc',
                      },
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          isDarkMode && {
            backgroundColor: '#23233a',
            borderTopColor: '#27272a',
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.resetButton,
            isDarkMode && { backgroundColor: '#27272a' },
          ]}
          onPress={handleReset}
        >
          <Text
            style={[styles.resetButtonText, isDarkMode && { color: '#a1a1aa' }]}
          >
            Reset
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.applyButton,
            isDarkMode && { backgroundColor: '#a5b4fc' },
          ]}
          onPress={handleApply}
        >
          <Text
            style={[styles.applyButtonText, isDarkMode && { color: '#23233a' }]}
          >
            Apply Filters
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 20,
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
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  optionTextSelected: {
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridOption: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  gridOptionSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#3B82F6',
  },
  gridOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textTransform: 'capitalize',
  },
  gridOptionTextSelected: {
    color: '#3B82F6',
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});
