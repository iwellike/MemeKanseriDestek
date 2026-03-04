import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, ScrollView, Linking, Alert, Animated,
} from 'react-native';
import { useApp } from '../context/AppContext';

const emergencyContacts = [
  { id: '1', name: 'Acil Servis', number: '112', emoji: '🚑', color: '#E74C3C', desc: 'Genel acil yardım' },
  { id: '2', name: 'Zehir Danışma', number: '114', emoji: '☎️', color: '#E67E22', desc: 'Zehirlenme durumunda' },
  { id: '3', name: 'Onkoloji Kliniği', number: '0312 305 1000', emoji: '🏥', color: '#9B59B6', desc: 'Hastane acil hattı' },
  { id: '4', name: 'Psikososyal Destek', number: '182', emoji: '💙', color: '#3498DB', desc: 'Ruh sağlığı desteği' },
];

const warningSigns = [
  { emoji: '🌡️', text: '38°C üzeri ateş', urgent: true },
  { emoji: '🩸', text: 'Kontrolsüz kanama', urgent: true },
  { emoji: '😮‍💨', text: 'Nefes darlığı', urgent: true },
  { emoji: '💔', text: 'Göğüs ağrısı', urgent: true },
  { emoji: '🤢', text: 'Şiddetli bulantı/kusma', urgent: false },
  { emoji: '😵', text: 'Bilinç bulanıklığı', urgent: true },
  { emoji: '💪', text: 'Aşırı halsizlik', urgent: false },
  { emoji: '🦵', text: 'Bacakta şişlik/ağrı', urgent: false },
];

export default function EmergencyScreen() {
  const { colors } = useApp();
  const [pulse] = useState(new Animated.Value(1));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.08, duration: 600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const callNumber = (number, name) => {
    Alert.alert(
      `${name} Aranıyor`,
      `${number} numaralı hattı aramak istiyor musunuz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Ara', onPress: () => Linking.openURL(`tel:${number}`) },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Big Emergency Button */}
        <Animated.View style={{ transform: [{ scale: pulse }] }}>
          <TouchableOpacity
            style={styles.emergencyBtn}
            onPress={() => callNumber('112', 'Acil Servis')}
          >
            <Text style={styles.emergencyEmoji}>🚨</Text>
            <Text style={styles.emergencyBtnText}>ACİL YARDIM ÇAĞIR</Text>
            <Text style={styles.emergencyNumber}>112</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Warning Signs */}
        <View style={[styles.warnCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={styles.warnTitle}>⚠️ Acil Servise Gitmeniz Gereken Durumlar</Text>
          <View style={styles.warnGrid}>
            {warningSigns.map((sign, i) => (
              <View key={i} style={[styles.warnItem, sign.urgent && styles.warnUrgent]}>
                <Text style={styles.warnEmoji}>{sign.emoji}</Text>
                <Text style={[styles.warnText, { color: sign.urgent ? '#C62828' : '#555' }]}>{sign.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact List */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>📞 Acil İletişim</Text>
        {emergencyContacts.map(contact => (
          <TouchableOpacity
            key={contact.id}
            style={[styles.contactCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}
            onPress={() => callNumber(contact.number, contact.name)}
          >
            <View style={[styles.contactIcon, { backgroundColor: contact.color + '22' }]}>
              <Text style={styles.contactEmoji}>{contact.emoji}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={[styles.contactName, { color: colors.textPrimary }]}>{contact.name}</Text>
              <Text style={[styles.contactDesc, { color: colors.textSecondary }]}>{contact.desc}</Text>
            </View>
            <View style={[styles.callBtn, { backgroundColor: contact.color }]}>
              <Text style={styles.callBtnText}>{contact.number}</Text>
              <Text style={styles.callIcon}>📞</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Info */}
        <View style={[styles.infoBox, { backgroundColor: '#E3F2FD' }]}>
          <Text style={styles.infoTitle}>💡 Bilgi</Text>
          <Text style={styles.infoText}>
            Kemoterapi sürecinde bağışıklık sisteminiz zayıflayabilir. 
            Ateş, nefes darlığı veya kontrolsüz kanama durumunda beklemeden 112'yi arayın veya en yakın acil servise başvurun.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 30, gap: 16 },
  emergencyBtn: {
    backgroundColor: '#E74C3C',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  emergencyEmoji: { fontSize: 48, marginBottom: 8 },
  emergencyBtnText: { color: '#fff', fontSize: 22, fontWeight: 'bold', letterSpacing: 1 },
  emergencyNumber: { color: 'rgba(255,255,255,0.9)', fontSize: 32, fontWeight: 'bold', marginTop: 4 },
  warnCard: { borderRadius: 14, padding: 16 },
  warnTitle: { fontSize: 14, fontWeight: '700', color: '#E65100', marginBottom: 12 },
  warnGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  warnItem: { flexDirection: 'row', alignItems: 'center', gap: 6, width: '48%', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 8, padding: 8 },
  warnUrgent: { backgroundColor: '#FFEBEE' },
  warnEmoji: { fontSize: 18 },
  warnText: { fontSize: 12, flex: 1 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  contactCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, borderWidth: 1, gap: 12 },
  contactIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  contactEmoji: { fontSize: 24 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: '700' },
  contactDesc: { fontSize: 12, marginTop: 2 },
  callBtn: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  callBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  callIcon: { fontSize: 14 },
  infoBox: { borderRadius: 12, padding: 16 },
  infoTitle: { fontSize: 14, fontWeight: '700', color: '#1565C0', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#1A237E', lineHeight: 21 },
});
