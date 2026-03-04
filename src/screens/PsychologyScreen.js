import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Animated, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';

const moods = [
  { emoji: '😄', label: 'Harika', color: '#4CAF50' },
  { emoji: '😊', label: 'İyi', color: '#8BC34A' },
  { emoji: '😐', label: 'Normal', color: '#FFC107' },
  { emoji: '😔', label: 'Üzgün', color: '#FF9800' },
  { emoji: '😢', label: 'Zor', color: '#F44336' },
];

const quotes = [
  { text: 'Her gün güçlüsün, sadece bunu hatırlamana gerek var.', author: '💙' },
  { text: 'Umut, en karanlık günlerde bile ışık saçar.', author: '🌟' },
  { text: 'Bu süreç seni tanımlamıyor; nasıl mücadele ettiğin tanımlıyor.', author: '🎗️' },
  { text: 'Küçük adımlar da ilerlemedir. Bugünkü adımın için gurur duy.', author: '🌈' },
  { text: 'Sen sandığından çok daha güçlüsün.', author: '💪' },
  { text: 'Bedenin savaşıyor, ruhun kazanıyor.', author: '✨' },
  { text: 'Bugünü atlattın. Yarın da atlayacaksın.', author: '🌸' },
];

const breathingSteps = [
  { text: 'Burundan 4 saniye nefes al', duration: 4, color: '#4ECDC4' },
  { text: '7 saniye nefesi tut', duration: 7, color: '#9B59B6' },
  { text: 'Ağızdan 8 saniye nefes ver', duration: 8, color: '#E91E8C' },
];

export default function PsychologyScreen() {
  const { colors } = useApp();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingStep, setBreathingStep] = useState(0);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const breathAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  useEffect(() => {
    loadMoodHistory();
    setCurrentQuoteIndex(new Date().getDay() % quotes.length);
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const loadMoodHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('moodHistory');
      if (data) setMoodHistory(JSON.parse(data));
    } catch (e) {}
  };

  const saveMood = async (mood) => {
    setSelectedMood(mood);
    const entry = { ...mood, date: new Date().toLocaleDateString('tr-TR'), time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) };
    const updated = [entry, ...moodHistory.slice(0, 9)];
    setMoodHistory(updated);
    await AsyncStorage.setItem('moodHistory', JSON.stringify(updated));
    await AsyncStorage.setItem('lastMood', mood.emoji);
    Alert.alert('Kaydedildi', `Ruh halin "${mood.label}" olarak kaydedildi. ${mood.emoji}`);
  };

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathingStep(0);
    runBreathingStep(0);
  };

  const runBreathingStep = (step) => {
    if (step >= breathingSteps.length) {
      setBreathingActive(false);
      Alert.alert('Tebrikler!', 'Nefes egzersizini tamamladın. 🌟 Harika iş!');
      return;
    }
    const s = breathingSteps[step];
    setBreathingStep(step);
    setBreathingTimer(s.duration);

    Animated.sequence([
      Animated.timing(breathAnim, { toValue: step === 0 ? 1.4 : step === 1 ? 1.4 : 0.8, duration: s.duration * 1000, useNativeDriver: true }),
    ]).start();

    let count = s.duration;
    timerRef.current = setInterval(() => {
      count--;
      setBreathingTimer(count);
      if (count <= 0) {
        clearInterval(timerRef.current);
        runBreathingStep(step + 1);
      }
    }, 1000);
  };

  const stopBreathing = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setBreathingActive(false);
    breathAnim.setValue(1);
  };

  const quote = quotes[currentQuoteIndex];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Daily Quote */}
        <View style={[styles.quoteCard, { backgroundColor: '#4ECDC4' }]}>
          <Text style={styles.quoteEmoji}>💬</Text>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.quoteAuthor}>{quote.author}</Text>
          <TouchableOpacity onPress={() => setCurrentQuoteIndex((currentQuoteIndex + 1) % quotes.length)} style={styles.nextQuoteBtn}>
            <Text style={styles.nextQuoteText}>Sonraki →</Text>
          </TouchableOpacity>
        </View>

        {/* Mood Tracker */}
        <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>😊 Bugün Nasıl Hissediyorsun?</Text>
          <View style={styles.moodRow}>
            {moods.map((mood, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.moodBtn, selectedMood?.label === mood.label && { borderColor: mood.color, borderWidth: 3 }]}
                onPress={() => saveMood(mood)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[styles.moodLabel, { color: colors.textSecondary }]}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Breathing Exercise */}
        <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>🌬️ Nefes Egzersizi (4-7-8)</Text>
          <Text style={[styles.sectionDesc, { color: colors.textSecondary }]}>Kaygı ve stresi azaltmak için kanıtlanmış teknik.</Text>

          {breathingActive ? (
            <View style={styles.breathingActive}>
              <Animated.View style={[styles.breathCircle, {
                backgroundColor: breathingSteps[breathingStep].color + '33',
                borderColor: breathingSteps[breathingStep].color,
                transform: [{ scale: breathAnim }],
              }]}>
                <Text style={styles.breathTimer}>{breathingTimer}</Text>
                <Text style={[styles.breathStepText, { color: breathingSteps[breathingStep].color }]}>
                  {breathingSteps[breathingStep].text.split(' ').slice(0, 2).join(' ')}
                </Text>
              </Animated.View>
              <Text style={[styles.breathInstruction, { color: colors.textPrimary }]}>
                {breathingSteps[breathingStep].text}
              </Text>
              <TouchableOpacity style={styles.stopBtn} onPress={stopBreathing}>
                <Text style={styles.stopBtnText}>Durdur</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.startBreathBtn} onPress={startBreathing}>
              <Text style={styles.startBreathText}>🌬️ Egzersize Başla</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Mood History */}
        {moodHistory.length > 0 && (
          <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>📅 Ruh Hali Geçmişi</Text>
            {moodHistory.slice(0, 5).map((entry, i) => (
              <View key={i} style={[styles.historyRow, { borderBottomColor: colors.border }]}>
                <Text style={styles.historyEmoji}>{entry.emoji}</Text>
                <Text style={[styles.historyLabel, { color: colors.textPrimary }]}>{entry.label}</Text>
                <Text style={[styles.historyDate, { color: colors.textSecondary }]}>{entry.date} {entry.time}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Self-care tips */}
        <View style={[styles.section, { backgroundColor: '#FFF8E1' }]}>
          <Text style={styles.tipsTitle}>💛 Kendinize İyi Bakın</Text>
          {[
            '🛌 Yeterli uyuyun (7-8 saat)',
            '🚶 Hafif yürüyüşler yapın',
            '👥 Sevdiklerinizle vakit geçirin',
            '📖 Günlük tutun, duygularınızı yazın',
            '🎵 Sevdiğiniz müziği dinleyin',
          ].map((tip, i) => (
            <Text key={i} style={styles.tip}>{tip}</Text>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 30, gap: 16 },
  quoteCard: { borderRadius: 16, padding: 20, alignItems: 'center' },
  quoteEmoji: { fontSize: 32, marginBottom: 10 },
  quoteText: { color: '#fff', fontSize: 16, textAlign: 'center', fontStyle: 'italic', lineHeight: 24 },
  quoteAuthor: { color: 'rgba(255,255,255,0.8)', fontSize: 20, marginTop: 10 },
  nextQuoteBtn: { marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6 },
  nextQuoteText: { color: '#fff', fontSize: 13 },
  section: { borderRadius: 16, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  sectionDesc: { fontSize: 13, marginBottom: 14, lineHeight: 20 },
  moodRow: { flexDirection: 'row', justifyContent: 'space-around' },
  moodBtn: { alignItems: 'center', padding: 8, borderRadius: 12, borderWidth: 2, borderColor: 'transparent' },
  moodEmoji: { fontSize: 32 },
  moodLabel: { fontSize: 11, marginTop: 4 },
  breathingActive: { alignItems: 'center', paddingVertical: 10 },
  breathCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 3, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  breathTimer: { fontSize: 36, fontWeight: 'bold', color: '#333' },
  breathStepText: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  breathInstruction: { fontSize: 15, textAlign: 'center', marginBottom: 16 },
  startBreathBtn: { backgroundColor: '#4ECDC4', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  startBreathText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  stopBtn: { backgroundColor: '#E74C3C', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 10 },
  stopBtnText: { color: '#fff', fontWeight: '600' },
  historyRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 },
  historyEmoji: { fontSize: 22, marginRight: 10 },
  historyLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
  historyDate: { fontSize: 12 },
  tipsTitle: { fontSize: 16, fontWeight: '700', color: '#E65100', marginBottom: 12 },
  tip: { fontSize: 14, color: '#555', paddingVertical: 4 },
});
