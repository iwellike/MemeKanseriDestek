import React from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { patientExperiences } from '../data/mockData';

export default function PatientExperiencesScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Alert.alert('Video', `${item.title} videosu oynatılıyor...`)}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.playIcon}>▶</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={patientExperiences}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Henüz deneyim videosu eklenmemiş.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  list: { padding: 16 },
  row: { gap: 12, marginBottom: 12 },
  card: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    height: 110,
    backgroundColor: '#BBBBBB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { fontSize: 32, color: COLORS.white },
  duration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    color: COLORS.white,
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.darkGray,
    padding: 10,
    textAlign: 'center',
  },
  center: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: COLORS.gray, fontSize: 15 },
});
