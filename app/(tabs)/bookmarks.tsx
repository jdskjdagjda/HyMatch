import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { JobListItem } from '@/components/JobListItem';
import { useJobs } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bookmark } from 'lucide-react-native';

export default function BookmarksScreen() {
  const { getChosenJobs } = useJobs();
  const { t } = useLanguage();
  const chosenJobs = getChosenJobs();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
      </View>

      {chosenJobs.length === 0 ? (
        <View style={styles.emptyState}>
          <Bookmark size={48} color="#9ca3af" />
          <Text style={styles.emptyText}>No bookmarked jobs yet</Text>
          <Text style={styles.emptySubtext}>
            Jobs you like will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={chosenJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobListItem job={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1f2937',
  },
  list: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginTop: 8,
    textAlign: 'center',
  },
});