import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Job } from '@/types/Job';
import { 
  Building2, 
  Coins, 
  Clock, 
  MapPin, 
  Star,
  Calendar,
  Globe,
  Train,
  Home
} from 'lucide-react-native';

interface JobCardProps {
  job: Job;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export function JobCard({ job }: JobCardProps) {
  const workDaysJapanese = {
    'Mon': 'MON',
    'Tue': 'TUE', 
    'Wed': 'WED',
    'Thu': 'THU',
    'Fri': 'FRI',
    'Sat': 'SAT',
    'Sun': 'SUN'
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header with building icon and title */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Building2 size={16} color="#FF6B35" />
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {job.title === 'Light Work' ? '軽作業【戸田コールドセンタ...' : 
             job.title === 'Kitchen Assistant' ? 'キッチンアシスタント' :
             job.title === 'Food Delivery Driver' ? 'フードデリバリー' :
             job.title === 'Data Entry Clerk' ? 'データ入力' :
             job.title === 'Store Assistant' ? '店舗スタッフ' :
             job.title === 'Hotel Room Cleaning' ? 'ホテル清掃' :
             job.title === 'Site Assistant' ? '現場アシスタント' :
             job.title === 'Waiter/Waitress' ? 'ウェイター・ウェイトレス' :
             job.title}
          </Text>
        </View>

        {/* Job category with icon */}
        <View style={styles.categoryRow}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryIcon}>
              <Text style={styles.categoryIconText}>📝</Text>
            </View>
            <Text style={styles.categoryText}>仕分け</Text>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>🏢</Text>
          </View>
        </View>

        {/* Salary and Japanese Level */}
        <View style={styles.salaryRow}>
          <View style={styles.salaryContainer}>
            <View style={styles.salaryIcon}>
              <Coins size={14} color="#FFB800" />
            </View>
            <Text style={styles.salaryText}>
              {job.salary === '¥1,000–¥2,000' ? '¥1,030～¥1,130' :
               job.salary === '¥1,200–¥1,800' ? '¥1,200～¥1,800' :
               job.salary === '¥1,500–¥2,500' ? '¥2,000～¥2,200' :
               job.salary}
            </Text>
          </View>
          <View style={styles.japaneseLevel}>
            <Globe size={12} color="#4CAF50" />
            <View style={styles.japaneseLevelDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, styles.activeDot]} />
              <View style={[styles.dot, job.japaneseLevel === 'N1' || job.japaneseLevel === 'N2' ? styles.activeDot : styles.inactiveDot]} />
            </View>
            <Text style={styles.japaneseLevelText}>{job.japaneseLevel}</Text>
          </View>
        </View>

        {/* Commute time and station */}
        <View style={styles.commuteRow}>
          <View style={styles.commuteContainer}>
            <View style={styles.commuteIcon}>
              <Clock size={14} color="#FF6B35" />
            </View>
            <Text style={styles.commuteText}>? 分</Text>
          </View>
          <View style={styles.stationContainer}>
            <View style={styles.stationIcon}>
              <Train size={12} color="#4CAF50" />
            </View>
            <Text style={styles.stationText}>
              {job.location.includes('Shibuya') ? '戸田公園' :
               job.location.includes('Shinjuku') ? '新宿' :
               job.location.includes('Harajuku') ? '原宿' :
               job.location.includes('Ginza') ? '銀座' :
               job.location.includes('Akihabara') ? '秋葉原' :
               job.location.includes('Roppongi') ? '六本木' :
               job.location.includes('Odaiba') ? 'お台場' :
               job.location.includes('Ebisu') ? '恵比寿' : '駅'}
            </Text>
          </View>
        </View>

        {/* Work schedule */}
        <View style={styles.scheduleContainer}>
          <View style={styles.workDays}>
            {job.workDays.map((day, index) => (
              <View 
                key={index} 
                style={[
                  styles.dayBadge,
                  day === 'Sat' || day === 'Sun' ? styles.weekendBadge : styles.weekdayBadge
                ]}
              >
                <Text style={[
                  styles.dayText,
                  day === 'Sat' || day === 'Sun' ? styles.weekendText : styles.weekdayText
                ]}>
                  {workDaysJapanese[day] || day}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.timeContainer}>
            <Clock size={12} color="#666" />
            <Text style={styles.timeText}>
              {job.title === 'Light Work' ? '09:00 ～ 18:00' :
               job.title === 'Kitchen Assistant' ? '08:00 ～ 13:00' :
               job.title === 'Food Delivery Driver' ? '11:00 ～ 15:00' :
               '09:00 ～ 18:00'}
            </Text>
          </View>
        </View>

        {/* Bottom icons */}
        <View style={styles.bottomIcons}>
          <View style={styles.iconBadge}>
            <Star size={16} color="#FFB800" />
          </View>
          <View style={styles.iconBadge}>
            <Home size={16} color="#4CAF50" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 520,
    padding: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    lineHeight: 18,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  categoryIconText: {
    fontSize: 12,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  categoryBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#FFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  categoryBadgeText: {
    fontSize: 12,
  },
  salaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  salaryText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  japaneseLevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  japaneseLevelDots: {
    flexDirection: 'row',
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  inactiveDot: {
    backgroundColor: '#DDD',
  },
  japaneseLevelText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  commuteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  commuteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commuteIcon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  commuteText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stationIcon: {
    marginRight: 4,
  },
  stationText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4CAF50',
  },
  scheduleContainer: {
    marginBottom: 20,
  },
  workDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 4,
  },
  dayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 4,
    marginBottom: 4,
  },
  weekdayBadge: {
    backgroundColor: '#FFB800',
  },
  weekendBadge: {
    backgroundColor: '#999',
  },
  dayText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  weekdayText: {
    color: '#FFF',
  },
  weekendText: {
    color: '#FFF',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginLeft: 4,
  },
  bottomIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 'auto',
  },
  iconBadge: {
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});