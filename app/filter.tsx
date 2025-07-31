import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useJobs, JobFilters, SortOption } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, Menu, ArrowUpDown, MapPin, Chrome as Home, GraduationCap, Globe, Coins, Clock, Star } from 'lucide-react-native';

export default function FilterModal() {
  const router = useRouter();
  const { filters, setFilters, sortBy, setSortBy } = useJobs();
  const { t } = useLanguage();
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);
  const [localSortBy, setLocalSortBy] = useState<SortOption>(sortBy);
  const [showJapaneseLevelModal, setShowJapaneseLevelModal] = useState(false);
  const [showSalaryModal, setShowSalaryModal] = useState(false);

  const japaneseLevels = ['N1', 'N2', 'N3', 'N4', 'N5'];
  const salaryOptions = ['時給', '日給', '月給', '年収'];

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

  const toggleJapaneseLevel = (level: string) => {
    setLocalFilters(prev => ({
      ...prev,
      japaneseLevels: prev.japaneseLevels.includes(level)
        ? prev.japaneseLevels.filter(l => l !== level)
        : [...prev.japaneseLevels, level]
    }));
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
          {/* Sort by Salary */}
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setLocalSortBy('wage')}
          >
            <View style={styles.radioButton}>
              {localSortBy === 'wage' && <View style={styles.radioInner} />}
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
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setLocalSortBy('commute')}
          >
            <View style={styles.radioButton}>
              {localSortBy === 'commute' && <View style={styles.radioInner} />}
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
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setLocalSortBy('date')}
          >
            <View style={styles.radioButton}>
              {localSortBy === 'date' && <View style={styles.radioInner} />}
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
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setShowJapaneseLevelModal(true)}
          >
            <View style={styles.radioButton}>
              {localFilters.japaneseLevels.length > 0 && <View style={styles.radioInner} />}
            </View>
            <View style={styles.iconContainer}>
              <Globe size={16} color="#2196F3" />
            </View>
            <Text style={styles.filterText}>日本語レベル</Text>
          </TouchableOpacity>

          {/* Hourly Wage */}
          <TouchableOpacity 
            style={styles.filterItem}
            onPress={() => setShowSalaryModal(true)}
          >
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

      {/* Japanese Level Modal */}
      <Modal
        visible={showJapaneseLevelModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowJapaneseLevelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>日本語レベル</Text>
              <TouchableOpacity onPress={() => setShowJapaneseLevelModal(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {japaneseLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={styles.modalItem}
                onPress={() => toggleJapaneseLevel(level)}
              >
                <View style={styles.checkbox}>
                  {localFilters.japaneseLevels.includes(level) && (
                    <View style={styles.checkboxInner} />
                  )}
                </View>
                <Text style={styles.modalItemText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Salary Modal */}
      <Modal
        visible={showSalaryModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSalaryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>給与</Text>
              <TouchableOpacity onPress={() => setShowSalaryModal(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>
            {salaryOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalItem}
                onPress={() => setShowSalaryModal(false)}
              >
                <View style={styles.checkbox}>
                  <View style={styles.checkboxInner} />
                </View>
                <Text style={styles.modalItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#2196F3',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: '#2196F3',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
});