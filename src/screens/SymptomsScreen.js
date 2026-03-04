import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { symptoms } from '../data/mockData';

export default function SymptomsScreen({ navigation }) {
  const [loading] = useState(false);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('SymptomDetail', { symptom: item })}
    >
      <View style={[styles.initial, { backgroundColor: item.color }]}>
        <Text style={styles.initialText}>{item.initial}</Text>
      </View>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBanner}>
        <Text style={styles.bannerText}>Belirtinizi seçiniz</Text>
      </View>
      <FlatList
        data={symptoms}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Belirti bulunamadı.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  headerBanner: {
    backgroundColor: COLORS.primary,
    margin: 16,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  bannerText: { color: COLORS.white, fontSize: 15, fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  initial: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  initialText: { color: COLORS.white, fontWeight: 'bold', fontSize: 15 },
  label: { flex: 1, fontSize: 16, color: COLORS.darkGray },
  chevron: { fontSize: 22, color: COLORS.gray },
  separator: { height: 1, backgroundColor: COLORS.border },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 },
  emptyText: { color: COLORS.gray, fontSize: 16 },
});
