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
import { X, Menu, ArrowUpDown, MapPin, Chrome as Home, GraduationCap, Globe, Coins, Clock, Star } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function FilterModal() {
  const router = useRouter();
  const { filters, setFilters, sortBy, setSortBy } = useJobs();
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);
  const [localSortBy, setLocalSortBy] = useState<SortOption>(sortBy);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Menu size={20} color="#333" />
          <Text style={styles.headerTitle}>ソート</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sort Section */}
        <View style={styles.section}>
          {/* Sort by Time */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Coins size={16} color="#FFB800" />
            </View>
            <Text style={styles.filterText}>時給</Text>
            <View style={styles.sortIcon}>
              <ArrowUpDown size={16} color="#999" />
            </View>
          </TouchableOpacity>

          {/* Commute Time (Home) */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Clock size={16} color="#FF6B35" />
            </View>
            <Text style={styles.filterText}>通勤時間（自宅）</Text>
            <View style={styles.sortIcon}>
              <ArrowUpDown size={16} color="#999" />
            </View>
          </TouchableOpacity>

          {/* Commute Time (School) */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <GraduationCap size={16} color="#4CAF50" />
            </View>
            <Text style={styles.filterText}>通勤時間（学校）</Text>
            <View style={styles.sortIcon}>
              <ArrowUpDown size={16} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <View style={styles.filterHeader}>
            <Menu size={16} color="#333" />
            <Text style={styles.filterHeaderText}>フィルタ</Text>
          </View>

          {/* Desired Job Type */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Star size={16} color="#4CAF50" />
            </View>
            <Text style={styles.filterText}>希望職種</Text>
          </TouchableOpacity>

          {/* Japanese Level */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Globe size={16} color="#2196F3" />
            </View>
            <Text style={styles.filterText}>日本語レベル</Text>
          </TouchableOpacity>

          {/* Hourly Wage */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Coins size={16} color="#FFB800" />
            </View>
            <Text style={styles.filterText}>時給</Text>
          </TouchableOpacity>

          {/* Convenient for Commute */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Clock size={16} color="#FF6B35" />
            </View>
            <Text style={styles.filterText}>通勤に便利なこと</Text>
          </TouchableOpacity>

          {/* Important for Work */}
          <TouchableOpacity style={styles.filterItem}>
            <View style={styles.radioButton}>
              <View style={styles.radioInner} />
            </View>
            <View style={styles.iconContainer}>
              <Star size={16} color="#FFB800" />
            </View>
            <Text style={styles.filterText}>仕事で大事な事</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  filterSection: {
    marginTop: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterHeaderText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginLeft: 8,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  filterText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  sortIcon: {
    marginLeft: 8,
  },
});