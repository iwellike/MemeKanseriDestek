import React from 'react';
import {
  View, Text, StyleSheet, Switch, TouchableOpacity,
  SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleDarkMode, language, toggleLanguage, t } = useApp();
  const { user, logout } = useAuth();

  const rows = [
    {
      section: 'Görünüm',
      items: [
        {
          label: t('darkMode'),
          emoji: '🌙',
          type: 'switch',
          value: isDarkMode,
          onToggle: toggleDarkMode,
        },
        {
          label: t('language'),
          emoji: '🌍',
          type: 'button',
          value: language === 'tr' ? '🇹🇷 Türkçe' : '🇺🇸 English',
          onPress: toggleLanguage,
        },
      ],
    },
    {
      section: 'Hesap',
      items: [
        { label: 'Ad Soyad', emoji: '👤', type: 'info', value: user?.name },
        { label: 'E-posta', emoji: '📧', type: 'info', value: user?.email },
        { label: 'Hesap Türü', emoji: '🏷️', type: 'info', value: user?.role === 'nurse' ? 'Hemşire' : 'Hasta' },
      ],
    },
    {
      section: 'Uygulama',
      items: [
        { label: 'Versiyon', emoji: 'ℹ️', type: 'info', value: '1.0.0' },
        { label: 'Geliştirici', emoji: '💻', type: 'info', value: 'Mobil Uygulama Projesi' },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header */}
        <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
          </View>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>

        {rows.map((section, si) => (
          <View key={si} style={styles.section}>
            <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>{section.section.toUpperCase()}</Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              {section.items.map((item, ii) => (
                <View key={ii}>
                  <View style={styles.row}>
                    <Text style={styles.rowEmoji}>{item.emoji}</Text>
                    <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{item.label}</Text>
                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor={item.value ? '#fff' : '#f4f3f4'}
                      />
                    )}
                    {item.type === 'button' && (
                      <TouchableOpacity onPress={item.onPress} style={[styles.langBtn, { backgroundColor: colors.primary + '22', borderColor: colors.primary }]}>
                        <Text style={[styles.langBtnText, { color: colors.primary }]}>{item.value}</Text>
                      </TouchableOpacity>
                    )}
                    {item.type === 'info' && (
                      <Text style={[styles.rowValue, { color: colors.textSecondary }]}>{item.value}</Text>
                    )}
                  </View>
                  {ii < section.items.length - 1 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert('Çıkış', 'Çıkış yapmak istiyor musunuz?', [
            { text: 'İptal', style: 'cancel' },
            { text: 'Çıkış', style: 'destructive', onPress: logout },
          ])}
        >
          <Text style={styles.logoutText}>🚪 Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 30 },
  profileCard: { borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20 },
  avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  profileName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  profileEmail: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  section: { marginBottom: 16 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 6, marginLeft: 4 },
  sectionCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10 },
  rowEmoji: { fontSize: 20, width: 28 },
  rowLabel: { flex: 1, fontSize: 15 },
  rowValue: { fontSize: 14 },
  langBtn: { borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 },
  langBtnText: { fontWeight: '600', fontSize: 13 },
  divider: { height: 1, marginLeft: 52 },
  logoutBtn: { backgroundColor: '#FFEBEE', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  logoutText: { color: '#E74C3C', fontSize: 16, fontWeight: '700' },
});
