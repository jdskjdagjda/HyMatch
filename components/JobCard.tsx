import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBuilding,
  faFileContract,
  faCoins,
  faGlobe,
  faClock,
  faCalendarAlt,
  faTrain,
  faHome,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Job } from '@/types/Job';

interface JobCardProps {
  job: Job;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 20;

export function JobCard({ job }: JobCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={[styles.rowBetween, styles.sectionBorder]}>
          <View style={styles.rowCenterFull}>
            <View style={styles.iconCircleLarge}>
              <FontAwesomeIcon icon={faBuilding} size={28} color="#1E90FF" />
            </View>
            <Text style={styles.title}>{job.title}</Text>
          </View>
        </View>

        {/* Job Type */}
        <View style={[styles.infoSection, styles.sectionBorder]}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenterFull}>
              <View style={styles.iconCircleLarge}>
                <FontAwesomeIcon icon={faFileContract} size={26} color="#1E90FF" />
              </View>
              <Text style={styles.infoText}>{job.type}</Text>
            </View>
            <View style={styles.iconCircleLarge}>
              <Text style={{ fontSize: 22 }}>🏢</Text>
            </View>
          </View>
        </View>

        {/* Salary & Language Level */}
        <View style={[styles.rowBetween, styles.sectionBorder]}>
          <View style={styles.rowCenterFull}>
            <View style={styles.iconCircleLarge}>
              <FontAwesomeIcon icon={faCoins} size={26} color="#1E90FF" />
            </View>
            <Text style={styles.infoText}>{job.salary}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.rowCenterFull}>
            <View style={styles.iconCircleLarge}>
              <FontAwesomeIcon icon={faGlobe} size={26} color="#1E90FF" />
            </View>
            <Text style={styles.infoText}>{job.japaneseLevel}</Text>
          </View>
        </View>

        {/* Commute Time & Station */}
        <View style={[styles.rowBetween, styles.sectionBorder]}>
          <View style={styles.rowCenterFull}>
            <View style={styles.iconCircleLarge}>
              <FontAwesomeIcon icon={faHome} size={26} color="#1E90FF" />
            </View>
            <Text style={styles.infoText}>{job.commuteTime}</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.rowCenterFull}>
            <View style={styles.iconCircleLarge}>
              <FontAwesomeIcon icon={faTrain} size={26} color="#1E90FF" />
            </View>
            <Text style={styles.infoText}>{job.location}</Text>
          </View>
        </View>

        {/* Work Days & Time */}
        <View style={[styles.scheduleBlock, styles.sectionBorder]}>
          <View style={styles.rowWrap}>
            {job.workDays.map((day, index) => (
              <View
                key={index}
                style={[styles.dayBadge, styles.dayActive]}
              >
                <Text style={styles.dayTextActive}>{day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.rowCenterFull}>
            <FontAwesomeIcon icon={faClock} size={22} color="#1E90FF" />
            <Text style={styles.infoText}>09:00 ～ 18:00</Text>
          </View>
        </View>

        {/* Highlights */}
        <View style={[styles.rowStart, styles.sectionBorder]}>
          <View style={styles.iconCircleLarge}>
            <FontAwesomeIcon icon={faStar} size={26} color="#1E90FF" />
          </View>
          <View style={styles.starFeatures}>
            {job.highlights.map((item, index) => (
              <View key={index} style={styles.starIcon}>
                <Text style={{ color: '#fff', fontSize: 12 }}>{item.length > 6 ? item.slice(0, 5) + '…' : item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    padding: 8,
    paddingTop: 4,
    borderWidth: 2,
    borderColor: '#c29c70',
    borderRadius: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 36,
    minHeight: 620,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowCenterFull: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
  iconCircleLarge: {
    borderWidth: 1,
    borderColor: '#c29c70',
    borderRadius: 50,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    paddingVertical: 4,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dayBadge: {
    borderWidth: 1,
    borderColor: '#c29c70',
    borderRadius: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayActive: {
    backgroundColor: '#c29c70',
  },
  dayTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scheduleBlock: {
    gap: 10,
  },
  starFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    flex: 1,
  },
  starIcon: {
    minWidth: 34,
    height: 34,
    paddingHorizontal: 8,
    backgroundColor: '#c29c70',
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBorder: {
    borderTopWidth: 1,
    borderColor: '#c29c70',
    paddingTop: 12,
    marginTop: -6,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#c29c70',
    marginHorizontal: 10,
  },
});