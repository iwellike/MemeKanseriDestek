import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Alert, Image,
} from 'react-native';
import { COLORS } from '../constants/colors';

export default function BloodTestScreen() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploads, setUploads] = useState([]);

  const handlePickFile = () => {
    // Simulate file selection
    setSelectedFile({ name: 'kan_tahlili_2024.pdf', size: '2.3 MB' });
    setUploaded(false);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      Alert.alert('Uyarı', 'Lütfen önce bir dosya seçin.');
      return;
    }
    setShowSuccess(true);
    setUploads(prev => [
      { id: Date.now().toString(), name: selectedFile.name, date: new Date().toLocaleDateString('tr-TR') },
      ...prev,
    ]);
  };

  const handleHide = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.hideBtn} onPress={handleHide}>
              <Text style={styles.hideBtnText}>Resmi Gizle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
              <Text style={styles.uploadBtnText}>Yükle  ›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.filePicker} onPress={handlePickFile}>
            {selectedFile ? (
              <View style={styles.fileSelected}>
                <Text style={styles.fileIcon}>📄</Text>
                <Text style={styles.fileName}>{selectedFile.name}</Text>
                <Text style={styles.fileSize}>{selectedFile.size}</Text>
              </View>
            ) : (
              <View style={styles.fileEmpty}>
                <Text style={styles.uploadIcon}>📤</Text>
                <Text style={styles.fileEmptyText}>Dosya seçmek için dokunun</Text>
                <Text style={styles.fileEmptySubtext}>PDF, JPG, PNG desteklenir</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Previous Uploads */}
        {uploads.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Önceki Yüklemeler</Text>
            {uploads.map(item => (
              <View key={item.id} style={styles.uploadItem}>
                <Text style={styles.uploadItemIcon}>🩸</Text>
                <View>
                  <Text style={styles.uploadItemName}>{item.name}</Text>
                  <Text style={styles.uploadItemDate}>{item.date}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {uploads.length === 0 && !selectedFile && (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🩸</Text>
            <Text style={styles.emptyText}>Henüz tahlil yüklenmedi.</Text>
          </View>
        )}
      </ScrollView>

      {/* Success Modal */}
      {showSuccess && (
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowSuccess(false)}>
              <Text>✕</Text>
            </TouchableOpacity>
            <View style={styles.successIcon}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Kan Tahlili Yükleme</Text>
            <Text style={styles.modalText}>Kan Tahliliniz yüklendi.</Text>
            <TouchableOpacity style={styles.okBtn} onPress={() => { setShowSuccess(false); setSelectedFile(null); }}>
              <Text style={styles.okBtnText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 16, paddingBottom: 30 },
  uploadSection: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  hideBtn: {
    backgroundColor: '#9B59B6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  hideBtnText: { color: COLORS.white, fontSize: 13, fontWeight: '600' },
  uploadBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  uploadBtnText: { color: COLORS.white, fontSize: 13, fontWeight: '600' },
  filePicker: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 10,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  fileSelected: { alignItems: 'center', padding: 20 },
  fileIcon: { fontSize: 40, marginBottom: 8 },
  fileName: { fontSize: 14, fontWeight: '600', color: COLORS.darkGray },
  fileSize: { fontSize: 12, color: COLORS.gray },
  fileEmpty: { alignItems: 'center', padding: 20 },
  uploadIcon: { fontSize: 40, marginBottom: 8 },
  fileEmptyText: { fontSize: 14, color: COLORS.gray },
  fileEmptySubtext: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.darkGray, marginBottom: 12 },
  uploadItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  uploadItemIcon: { fontSize: 24 },
  uploadItemName: { fontSize: 14, fontWeight: '500', color: COLORS.darkGray },
  uploadItemDate: { fontSize: 12, color: COLORS.gray },
  empty: { alignItems: 'center', paddingTop: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: COLORS.gray, fontSize: 15 },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  closeBtn: { position: 'absolute', top: 12, right: 16 },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  checkmark: { fontSize: 28, color: COLORS.success },
  modalTitle: { fontSize: 16, fontWeight: '700', color: COLORS.darkGray, marginBottom: 8 },
  modalText: { fontSize: 14, color: COLORS.gray, marginBottom: 20 },
  okBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  okBtnText: { color: COLORS.white, fontSize: 15, fontWeight: '600' },
});
