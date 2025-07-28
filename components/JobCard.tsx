import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFileContract,
  faUtensils,
  faGlobe,
  faCoins,
  faHome,
  faTrain,
  faCalendarAlt,
  faClock,
  faStar,
  faSeedling,
  faInfo,
  faBuilding,
  faBellConcierge,
  faBroom,
  faIndustry,
  faTruck,
  faHotel,
  faTrainSubway,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

interface Job {
  title: string;
  salary: string;
  location: string;
  commuteTime: string;
  japaneseLevel: string;
  workDays: string[];
  highlights?: string[];
  type?: string;
  star?: Record<string, boolean>;
  stationCode?: string;
  nearStationName?: string;
  time?: string;
  fromHome?: string;
  icon?: string;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const typeIconMap: Record<string, any> = {
    utensils: faUtensils,
    bellConcierge: faBellConcierge,
    broom: faBroom,
    industry: faIndustry,
    truck: faTruck,
    hotel: faHotel,
  };

  const starIconConfig = [
    { key: 'nearStation', icon: faTrainSubway },
    { key: 'beginnerWelcome', icon: faSeedling },
    { key: 'salaryIncrease', icon: faArrowUp },
    { key: 'timeFlexiblity', icon: faClock },
    { key: '5/7Workday', icon: faCalendarAlt },
  ];

  return (
    <View
      style={{
        height: '100%',
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 24,
          padding: 16,
          justifyContent: 'space-between',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <FontAwesomeIcon icon={faBuilding} size={26} color="#2563eb" />
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              {job.title}
            </Text>
          </View>
   
        </View>

        {/* Type Row */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faFileContract} size={22} color="#2563eb" />
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {job.type ?? 'Job'}
            </Text>
          </View>
          {job.icon && typeIconMap[job.icon] && (
            <FontAwesomeIcon
              icon={typeIconMap[job.icon]}
              size={22}
              color="#2563eb"
            />
          )}
        </View>

        {/* Salary and Japanese Level */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faCoins} size={22} color="#2563eb" />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {job.salary}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faGlobe} size={22} color="#2563eb" />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {job.japaneseLevel}
            </Text>
          </View>
        </View>

        {/* From Home & Station */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 12,
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faHome} size={22} color="#2563eb" />
            <Text style={{ fontSize: 15 }}>~ {job.commuteTime}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesomeIcon icon={faTrain} size={22} color="#2563eb" />
            <Text style={{ fontSize: 15 }}>
              {job.stationCode ?? 'STA'} - {job.nearStationName ?? 'Station'}
            </Text>
          </View>
        </View>

        {/* Work Days */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
            Work Days
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {job.workDays.map((day, idx) => (
              <View
                key={idx}
                style={{
                  borderWidth: 1,
                  borderColor: '#c29c70',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 20,
                  backgroundColor: '#fefcf9',
                }}
              >
                <Text style={{ fontSize: 13 }}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Time */}
        {job.time && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
            }}
          >
            <FontAwesomeIcon icon={faClock} size={20} color="#2563eb" />
            <Text style={{ fontSize: 15 }}>{job.time}</Text>
          </View>
        )}

        {/* Stars */}
        {job.star && (
          <View
            style={{
              marginTop: 8,
              paddingTop: 12,
              borderTopWidth: 1,
              borderColor: '#e5e7eb',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {starIconConfig
              .filter((config) => job.star?.[config.key])
              .map((config, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#c29c70',
                    padding: 10,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={config.icon} size={16} color="#fff" />
                </View>
              ))}
          </View>
        )}
      </View>
    </View>
  );
}
