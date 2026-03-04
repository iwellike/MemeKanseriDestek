import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';

const STORAGE_KEY = 'symptomRecords';

export default function SymptomCalendarScreen() {
  const { colors } = useApp();
  const [records, setRecords] = useState([]);
  const [period, setPeriod] = useState('');
  const [severity, setSeverity] = useState('');
  const [symptomType, setSymptomType] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadRecords(); }, []);

  const loadRecords = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setRecords(JSON.parse(data));
    } catch (e) {}
  };

  const addRecord = async () => {
    if (!period || !severity) { Alert.alert('Hata', 'Periyot ve şiddet alanlarını doldurun.'); return; }
    const newRecord = { id: Date.now().toString(), period, severity, symptomType, date: new Date().toLocaleDateString('tr-TR') };
    const updated = [newRecord, ...records];
    setRecords(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPeriod(''); setSeverity(''); setSymptomType(''); setShowForm(false);
    Alert.alert('Kaydedildi', 'Belirti takvime eklendi.');
  };

  const deleteRecord = async (id) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const severityColors = { 'Hafif': '#4CAF50', 'Orta': '#FF9800', 'Şiddetli': '#F44336' };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={() => setShowForm(!showForm)}>
          <Text style={styles.addBtnText}>{showForm ? '✕ Kapat' : '+ Belirti Ekle'}</Text>
        </TouchableOpacity>

        {showForm && (
          <View style={[styles.form, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <Text style={[styles.formTitle, { color: colors.textPrimary }]}>Yeni Belirti Kaydı</Text>
            {[{ label: 'Belirti Türü', value: symptomType, set: setSymptomType, placeholder: 'Örn: Bulantı, Ağrı...' },
              { label: 'Belirti Periyodu', value: period, set: setPeriod, placeholder: 'Örn: 1-5 Mart 2024' }].map(f => (
              <View key={f.label} style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>{f.label}</Text>
                <TextInput style={[styles.input, { backgroundColor: colors.background, color: colors.textPrimary, borderColor: colors.border }]} placeholder={f.placeholder} placeholderTextColor={colors.textSecondary} value={f.value} onChangeText={f.set} />
              </View>
            ))}
            <Text style={[styles.label, { color: colors.textSecondary }]}>Belirti Şiddeti</Text>
            <View style={styles.severityRow}>
              {['Hafif', 'Orta', 'Şiddetli'].map(s => (
                <TouchableOpacity key={s} style={[styles.severityBtn, { backgroundColor: severity === s ? severityColors[s] : colors.background, borderColor: severityColors[s] }]} onPress={() => setSeverity(s)}>
                  <Text style={{ color: severity === s ? '#fff' : severityColors[s], fontWeight: '600' }}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={addRecord}>
              <Text style={styles.saveBtnText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        )}

        {records.length === 0 && !showForm ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Henüz belirti kaydı yok.</Text>
          </View>
        ) : (
          records.map(record => (
            <View key={record.id} style={[styles.recordCard, { backgroundColor: colors.cardBg, borderLeftColor: severityColors[record.severity] || colors.primary }]}>
              <View style={styles.recordHeader}>
                <Text style={[styles.recordType, { color: colors.textPrimary }]}>{record.symptomType || 'Belirti'}</Text>
                <TouchableOpacity onPress={() => deleteRecord(record.id)}><Text style={{ color: colors.danger }}>🗑️</Text></TouchableOpacity>
              </View>
              <Text style={[styles.recordInfo, { color: colors.textSecondary }]}>📅 {record.period}</Text>
              <View style={[styles.severityBadge, { backgroundColor: (severityColors[record.severity] || '#888') + '22' }]}>
                <Text style={{ color: severityColors[record.severity] || '#888', fontSize: 12, fontWeight: '600' }}>{record.severity}</Text>
              </View>
              <Text style={[styles.recordDate, { color: colors.textSecondary }]}>Eklenme: {record.date}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 30 },
  addBtn: { borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginBottom: 16 },
  addBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  form: { borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1 },
  formTitle: { fontSize: 16, fontWeight: '700', marginBottom: 14 },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 14 },
  severityRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  severityBtn: { flex: 1, borderRadius: 8, paddingVertical: 10, alignItems: 'center', borderWidth: 2 },
  saveBtn: { borderRadius: 10, paddingVertical: 13, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 10 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 16 },
  recordCard: { borderRadius: 10, padding: 14, marginBottom: 10, borderLeftWidth: 4 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  recordType: { fontSize: 15, fontWeight: '700' },
  recordInfo: { fontSize: 13, marginBottom: 6 },
  severityBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 6 },
  recordDate: { fontSize: 11 },
});
