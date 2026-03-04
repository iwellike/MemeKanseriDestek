import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  SafeAreaView, Animated, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { colors, t } = useApp();
  const { user } = useAuth();
  const [stats, setStats] = useState({ symptoms: 0, medications: 0, questions: 0, mood: '😊' });
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    loadStats();
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const loadStats = async () => {
    try {
      const sym = await AsyncStorage.getItem('symptomRecords');
      const med = await AsyncStorage.getItem('medications');
      const que = await AsyncStorage.getItem('expertQuestions');
      const mood = await AsyncStorage.getItem('lastMood');
      setStats({
        symptoms: sym ? JSON.parse(sym).length : 0,
        medications: med ? JSON.parse(med).length : 0,
        questions: que ? JSON.parse(que).length : 0,
        mood: mood || '😊',
      });
    } catch (e) {}
  };

  const cards = [
    { label: 'Belirti Kaydı', value: stats.symptoms, emoji: '🩺', color: '#E91E8C', screen: 'SymptomCalendar' },
    { label: 'İlaç Sayısı', value: stats.medications, emoji: '💊', color: '#E67E22', screen: 'Medication' },
    { label: 'Sorularım', value: stats.questions, emoji: '💬', color: '#9B59B6', screen: 'Expert' },
    { label: 'Ruh Hali', value: stats.mood, emoji: '', color: '#4ECDC4', screen: 'Psychology' },
  ];

  const motivationQuotes = [
    'Her gün biraz daha güçlüsün. 💪',
    'Umut, en güçlü ilaçtır. 🌟',
    'Bugün de kazandın! Gurur duyuyoruz. 🎗️',
    'Küçük adımlar, büyük zaferler. 🌈',
  ];
  const todayQuote = motivationQuotes[new Date().getDay() % motivationQuotes.length];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* Welcome */}
          <View style={[styles.welcomeCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.welcomeText}>Merhaba, {user?.name?.split(' ')[0]} 👋</Text>
            <Text style={styles.welcomeDate}>{new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
            <View style={styles.motivationBox}>
              <Text style={styles.motivationText}>"{todayQuote}"</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>📊 Özet</Text>
          <View style={styles.grid}>
            {cards.map((card, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.statCard, { backgroundColor: card.color }]}
                onPress={() => navigation.navigate(card.screen)}
              >
                <Text style={styles.statEmoji}>{card.emoji}</Text>
                <Text style={styles.statValue}>{card.value}</Text>
                <Text style={styles.statLabel}>{card.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>⚡ Hızlı Erişim</Text>
          <View style={styles.quickActions}>
            {[
              { label: 'Belirti Ekle', emoji: '➕', screen: 'SymptomCalendar' },
              { label: 'İlaç Al', emoji: '💊', screen: 'Medication' },
              { label: 'Ruh Halim', emoji: '😊', screen: 'Psychology' },
              { label: 'Acil', emoji: '🚨', screen: 'Emergency' },
            ].map((a, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.quickBtn, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
                onPress={() => navigation.navigate(a.screen)}
              >
                <Text style={styles.quickEmoji}>{a.emoji}</Text>
                <Text style={[styles.quickLabel, { color: colors.textPrimary }]}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Today's medications reminder */}
          <View style={[styles.reminderCard, { backgroundColor: '#FFF3E0', borderColor: '#FFB300' }]}>
            <Text style={styles.reminderTitle}>⏰ Bugünün Hatırlatması</Text>
            <Text style={styles.reminderText}>İlaç takip ekranından günlük ilaçlarınızı kontrol etmeyi unutmayın!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Medication')}>
              <Text style={styles.reminderLink}>İlaçlara Git →</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 30 },
  welcomeCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  welcomeText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  welcomeDate: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  motivationBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  motivationText: { color: '#fff', fontSize: 14, fontStyle: 'italic', textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  statCard: {
    width: '47%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  statEmoji: { fontSize: 28, marginBottom: 6 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  quickActions: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  quickBtn: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  quickEmoji: { fontSize: 22, marginBottom: 4 },
  quickLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  reminderCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  reminderTitle: { fontSize: 15, fontWeight: '700', color: '#E65100', marginBottom: 6 },
  reminderText: { fontSize: 13, color: '#555', lineHeight: 20 },
  reminderLink: { color: '#E65100', fontWeight: '600', marginTop: 8 },
});
