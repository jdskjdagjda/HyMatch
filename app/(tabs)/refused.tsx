import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { JobListItem } from '@/components/JobListItem';
import { useJobs } from '@/contexts/JobContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { SlidersHorizontal, RotateCcw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

export default function RefusedScreen() {
  const { getRefusedJobs } = useJobs();
  const { t } = useLanguage();
  const router = useRouter();
  const refusedJobs = getRefusedJobs();
  const { isDarkMode } = useTheme();

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
          {t('tabs.refused')}
        </Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            isDarkMode && { backgroundColor: '#23233a' },
          ]}
          onPress={() => router.push('/filter')}
        >
          <SlidersHorizontal
            size={20}
            color={isDarkMode ? '#a5b4fc' : '#3B82F6'}
          />
        </TouchableOpacity>
      </View>

      {refusedJobs.length === 0 ? (
        <View style={styles.emptyState}>
          <RotateCcw size={48} color={isDarkMode ? '#a1a1aa' : '#9ca3af'} />
          <Text style={[styles.emptyText, isDarkMode && { color: '#a1a1aa' }]}>
            No refused jobs yet
          </Text>
          <Text
            style={[styles.emptySubtext, isDarkMode && { color: '#6b7280' }]}
          >
            Jobs you pass on will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={refusedJobs}
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
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
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
