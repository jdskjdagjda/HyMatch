import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Job } from '@/types/Job';
import { JobTypeIcon } from './JobTypeIcon';
import { WorkDayBadge } from './WorkDayBadge';
import { Clock, MapPin, BookOpen } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface JobListItemProps {
  job: Job;
  onPress?: () => void;
}

export function JobListItem({ job, onPress }: JobListItemProps) {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, isDarkMode && { backgroundColor: '#23233a' }]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <JobTypeIcon type={job.type} size={40} />
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, isDarkMode && { color: '#fff' }]}
            numberOfLines={2}
          >
            {job.title}
          </Text>
          <Text style={[styles.salary, isDarkMode && { color: '#a5b4fc' }]}>
            {job.salary}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <BookOpen size={14} color={isDarkMode ? '#a1a1aa' : '#6b7280'} />
          <Text style={[styles.infoText, isDarkMode && { color: '#a1a1aa' }]}>
            {job.japaneseLevel}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={14} color={isDarkMode ? '#a1a1aa' : '#6b7280'} />
          <Text style={[styles.infoText, isDarkMode && { color: '#a1a1aa' }]}>
            {job.commuteTime}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={14} color={isDarkMode ? '#a1a1aa' : '#6b7280'} />
          <Text
            style={[styles.infoText, isDarkMode && { color: '#a1a1aa' }]}
            numberOfLines={1}
          >
            {job.location}
          </Text>
        </View>
      </View>

      <View style={styles.workDaysContainer}>
        {job.workDays.slice(0, 4).map((day, index) => (
          <WorkDayBadge key={index} day={day} size="small" />
        ))}
        {job.workDays.length > 4 && (
          <Text style={[styles.moreText, isDarkMode && { color: '#a1a1aa' }]}>
            +{job.workDays.length - 4}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1f2937',
    marginBottom: 4,
  },
  salary: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#3B82F6',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4,
  },
  workDaysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  moreText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6b7280',
    marginLeft: 4,
  },
});
