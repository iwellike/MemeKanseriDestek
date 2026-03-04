import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { COLORS } from '../constants/colors';

export default function SymptomDetailScreen({ route }) {
  const { symptom } = route.params;

  const suggestions = [
    { id: '1', title: `${symptom.label} Yönetimi`, subtitle: 'Uzman önerileri ve yönetim stratejileri' },
    { id: '2', title: `${symptom.label} ile Başa Çıkma`, subtitle: 'Pratik ipuçları ve yaşam kalitesi önerileri' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Öneriler</Text>
          <Text style={styles.heroSubtitle}>{symptom.label}</Text>
        </View>

        <Text style={styles.sectionTitle}>Yönetim Videoları</Text>
        {suggestions.map(item => (
          <TouchableOpacity key={item.id} style={styles.videoCard}>
            <View style={styles.thumbnail}>
              <Text style={styles.thumbnailText}>▶</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <Text style={styles.videoSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Genel Bilgiler</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            {symptom.label} kemoterapi sürecinde sık görülen bir belirtidir. 
            Bu belirtiyi yönetmek için sağlık ekibinizle iletişimde olmanız önemlidir. 
            Şiddetli veya uzun süren belirtiler için mutlaka doktorunuza danışın.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 16, paddingBottom: 30 },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroTitle: { color: COLORS.white, fontSize: 22, fontWeight: 'bold' },
  heroSubtitle: { color: COLORS.white, fontSize: 15, opacity: 0.9, marginTop: 4 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: COLORS.darkGray, marginBottom: 12, marginTop: 8 },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 70,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  thumbnailText: { color: COLORS.white, fontSize: 22 },
  videoInfo: { flex: 1 },
  videoTitle: { fontSize: 14, fontWeight: '600', color: COLORS.darkGray },
  videoSubtitle: { fontSize: 12, color: COLORS.gray, marginTop: 3 },
  infoCard: {
    backgroundColor: '#F0FAFA',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  infoText: { fontSize: 14, color: COLORS.darkGray, lineHeight: 22 },
});
