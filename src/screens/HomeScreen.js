import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'covid', label: 'Covid-19 Bilgilendirme', color: '#9B59B6', emoji: '🦠', screen: 'CovidInfo', fullWidth: true },
  { id: 'breast', label: 'Meme Kanseri Hakkında Bilgilendirme', color: '#E67E22', emoji: '🎗️', screen: 'BreastCancerInfo', fullWidth: true },
  { id: 'symptoms', label: 'Belirti Yönetimi', color: '#E91E8C', emoji: '🩺', screen: 'Symptoms' },
  { id: 'expert', label: 'Uzmana Sor', color: '#4ECDC4', emoji: '💬', screen: 'Expert' },
  { id: 'patient', label: 'Hasta Deneyimleri', color: '#FF6B9D', emoji: '👤', screen: 'PatientExperiences' },
  { id: 'calendar', label: 'Belirti Takvimi', color: '#E74C3C', emoji: '📅', screen: 'SymptomCalendar' },
  { id: 'blood', label: 'Kan Tahlili', color: '#FF6B35', emoji: '🩸', screen: 'BloodTest' },
  { id: 'nutrition', label: 'Beslenme Rehberi', color: '#27AE60', emoji: '🥗', screen: 'Nutrition' },
  { id: 'medication', label: 'İlaç Takibi', color: '#F39C12', emoji: '💊', screen: 'Medication' },
  { id: 'psychology', label: 'Psikolojik Destek', color: '#8E44AD', emoji: '🧠', screen: 'Psychology' },
  { id: 'emergency', label: 'Acil Durum', color: '#C0392B', emoji: '🚨', screen: 'Emergency' },
  { id: 'contact', label: 'İletişim', color: '#4ECDC4', emoji: '📞', screen: 'Contact' },
  { id: 'about', label: 'Hakkında', color: '#3498DB', emoji: 'ℹ️', screen: 'About' },
];

export default function HomeScreen({ navigation }) {
  const { colors } = useApp();
  const topItems = menuItems.filter(i => i.fullWidth);
  const gridItems = menuItems.filter(i => !i.fullWidth);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.topSection}>
          {topItems.map(item => (
            <TouchableOpacity key={item.id} style={[styles.topButton, { backgroundColor: item.color }]} onPress={() => navigation.navigate(item.screen)}>
              <Text style={styles.topButtonEmoji}>{item.emoji}</Text>
              <Text style={styles.topButtonText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.grid}>
          {gridItems.map((item, index) => {
            if (index % 2 !== 0) return null;
            const next = gridItems[index + 1];
            return (
              <View key={item.id} style={styles.row}>
                <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => navigation.navigate(item.screen)}>
                  <Text style={styles.cardEmoji}>{item.emoji}</Text>
                  <Text style={styles.cardLabel}>{item.label}</Text>
                </TouchableOpacity>
                {next && (
                  <TouchableOpacity style={[styles.card, { backgroundColor: next.color }]} onPress={() => navigation.navigate(next.screen)}>
                    <Text style={styles.cardEmoji}>{next.emoji}</Text>
                    <Text style={styles.cardLabel}>{next.label}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { paddingHorizontal: 16, paddingTop: 16, gap: 8 },
  topButton: { borderRadius: 10, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  topButtonEmoji: { fontSize: 20 },
  topButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600', flex: 1 },
  grid: { padding: 16, paddingTop: 8 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  card: { flex: 1, borderRadius: 14, padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 100, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3 },
  cardEmoji: { fontSize: 28, marginBottom: 8 },
  cardLabel: { color: '#FFFFFF', fontSize: 13, fontWeight: '600', textAlign: 'center' },
});
