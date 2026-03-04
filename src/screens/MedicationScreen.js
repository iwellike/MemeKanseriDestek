import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, SafeAreaView, Alert, Modal, ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../context/AppContext';

const STORAGE_KEY = 'medications';

export default function MedicationScreen() {
  const { colors, t } = useApp();
  const [medications, setMedications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', dose: '', time: '', frequency: 'Günlük', notes: '' });

  useEffect(() => { loadMedications(); }, []);

  const loadMedications = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) setMedications(JSON.parse(data));
    } catch (e) {}
  };

  const saveMedications = async (list) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const addMedication = async () => {
    if (!form.name || !form.dose || !form.time) {
      Alert.alert('Hata', 'Lütfen ilaç adı, doz ve saati doldurun.');
      return;
    }
    const newMed = {
      id: Date.now().toString(),
      ...form,
      takenToday: false,
      createdAt: new Date().toLocaleDateString('tr-TR'),
    };
    const updated = [newMed, ...medications];
    setMedications(updated);
    await saveMedications(updated);
    setForm({ name: '', dose: '', time: '', frequency: 'Günlük', notes: '' });
    setModalVisible(false);
  };

  const toggleTaken = async (id) => {
    const updated = medications.map(m => m.id === id ? { ...m, takenToday: !m.takenToday } : m);
    setMedications(updated);
    await saveMedications(updated);
  };

  const deleteMedication = async (id) => {
    Alert.alert('Sil', 'Bu ilacı silmek istiyor musunuz?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil', style: 'destructive', onPress: async () => {
          const updated = medications.filter(m => m.id !== id);
          setMedications(updated);
          await saveMedications(updated);
        }
      },
    ]);
  };

  const filtered = medications.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const takenCount = medications.filter(m => m.takenToday).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Summary bar */}
      <View style={[styles.summaryBar, { backgroundColor: colors.primary }]}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{medications.length}</Text>
          <Text style={styles.summaryLabel}>Toplam İlaç</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{takenCount}</Text>
          <Text style={styles.summaryLabel}>Bugün Alındı</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{medications.length - takenCount}</Text>
          <Text style={styles.summaryLabel}>Bekliyor</Text>
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Text>🔍 </Text>
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder={t('search')}
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💊</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>Henüz ilaç eklenmedi.</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Sağ alttaki + butonuna basın.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.medCard, { backgroundColor: colors.cardBg, borderColor: colors.border, opacity: item.takenToday ? 0.7 : 1 }]}>
            <View style={styles.medLeft}>
              <View style={[styles.medDot, { backgroundColor: item.takenToday ? colors.green : colors.primary }]} />
              <View>
                <Text style={[styles.medName, { color: colors.textPrimary, textDecorationLine: item.takenToday ? 'line-through' : 'none' }]}>
                  {item.name}
                </Text>
                <Text style={[styles.medDetail, { color: colors.textSecondary }]}>
                  {item.dose} · {item.time} · {item.frequency}
                </Text>
                {item.notes ? <Text style={[styles.medNotes, { color: colors.textSecondary }]}>{item.notes}</Text> : null}
              </View>
            </View>
            <View style={styles.medActions}>
              <TouchableOpacity
                style={[styles.takenBtn, { backgroundColor: item.takenToday ? colors.green : colors.primary }]}
                onPress={() => toggleTaken(item.id)}
              >
                <Text style={styles.takenBtnText}>{item.takenToday ? '✓' : 'Al'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteMedication(item.id)} style={styles.deleteBtn}>
                <Text style={{ color: colors.danger }}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Add Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>💊 İlaç Ekle</Text>
            <ScrollView>
              {[
                { key: 'name', label: 'İlaç Adı *', placeholder: 'Örn: Tamoksifen' },
                { key: 'dose', label: 'Doz *', placeholder: 'Örn: 20mg' },
                { key: 'time', label: 'Saat *', placeholder: 'Örn: 08:00' },
                { key: 'notes', label: 'Notlar', placeholder: 'Ek notlar...' },
              ].map(f => (
                <View key={f.key} style={styles.formGroup}>
                  <Text style={[styles.formLabel, { color: colors.textSecondary }]}>{f.label}</Text>
                  <TextInput
                    style={[styles.formInput, { backgroundColor: colors.cardBg, color: colors.textPrimary, borderColor: colors.border }]}
                    placeholder={f.placeholder}
                    placeholderTextColor={colors.textSecondary}
                    value={form[f.key]}
                    onChangeText={v => setForm(p => ({ ...p, [f.key]: v }))}
                  />
                </View>
              ))}

              <Text style={[styles.formLabel, { color: colors.textSecondary }]}>Sıklık</Text>
              <View style={styles.freqRow}>
                {['Günlük', 'Haftalık', 'Gerektiğinde'].map(f => (
                  <TouchableOpacity
                    key={f}
                    style={[styles.freqBtn, { backgroundColor: form.frequency === f ? colors.primary : colors.cardBg, borderColor: colors.border }]}
                    onPress={() => setForm(p => ({ ...p, frequency: f }))}
                  >
                    <Text style={{ color: form.frequency === f ? '#fff' : colors.textPrimary, fontSize: 13 }}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalBtns}>
                <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.border }]} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: colors.textSecondary }}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={addMedication}>
                  <Text style={styles.saveBtnText}>Ekle</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  summaryBar: { flexDirection: 'row', padding: 16, justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryNum: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 },
  summaryDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  searchBar: { flexDirection: 'row', alignItems: 'center', margin: 12, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 15 },
  list: { padding: 12, paddingBottom: 80 },
  medCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1 },
  medLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  medDot: { width: 12, height: 12, borderRadius: 6 },
  medName: { fontSize: 16, fontWeight: '600' },
  medDetail: { fontSize: 13, marginTop: 2 },
  medNotes: { fontSize: 12, marginTop: 2, fontStyle: 'italic' },
  medActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  takenBtn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  takenBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  deleteBtn: { padding: 4 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyEmoji: { fontSize: 52 },
  emptyText: { fontSize: 16, fontWeight: '500' },
  emptySubtext: { fontSize: 13 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, backgroundColor: '#4ECDC4', alignItems: 'center', justifyContent: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  fabText: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '85%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  formGroup: { marginBottom: 14 },
  formLabel: { fontSize: 13, marginBottom: 6 },
  formInput: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 15 },
  freqRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  freqBtn: { borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1 },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center', borderWidth: 1 },
  saveBtn: { flex: 1, borderRadius: 10, paddingVertical: 14, alignItems: 'center', backgroundColor: '#4ECDC4' },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
