import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, ScrollView, SafeAreaView, Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';

export function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    Alert.alert('Başarılı', 'İletişim bilgileriniz kaydedildi.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>İsim Soyisim</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınız Soyadınız"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-posta adresiniz"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Telefon</Text>
          <TextInput
            style={styles.input}
            placeholder="Telefon numaranız"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.aboutHeader}>
          <Text style={styles.aboutEmoji}>🎗️</Text>
          <Text style={styles.aboutTitle}>Meme Kanseri Destek</Text>
          <Text style={styles.aboutVersion}>Versiyon 1.0.0</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Uygulama Hakkında</Text>
          <Text style={styles.cardText}>
            Bu uygulama, meme kanseri tanısı alan hastalar ve onların bakımlarıyla ilgilenen sağlık profesyonelleri 
            için geliştirilmiştir. Kemoterapi sürecindeki yan etkileri yönetmeye yardımcı olmak, 
            uzmanlarla iletişim kurmak ve hasta deneyimlerini paylaşmak amacıyla tasarlanmıştır.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Özellikler</Text>
          <Text style={styles.cardText}>
            • Belirti yönetimi ve takibi{'\n'}
            • Kan tahlili yükleme{'\n'}
            • Uzmana soru sorma{'\n'}
            • Hasta deneyim videoları{'\n'}
            • Belirti takvimi{'\n'}
            • Covid-19 ve meme kanseri bilgilendirme modülleri
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>İletişim</Text>
          <Text style={styles.cardText}>destekapp@example.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function CovidInfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.videoCard}>
          <View style={styles.videoThumb}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>COVID-19 BİLGİLENDİRME MODÜLÜ</Text>
            <Text style={styles.videoSub}>Kanser Hastaları İçin Önemli Bilgiler</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Önemli Bilgiler</Text>
          <Text style={styles.cardText}>
            Kemoterapi alan hastalar bağışıklık sistemi baskılandığından COVID-19 riski daha yüksektir. 
            Düzenli maske kullanımı, el hijyeni ve sosyal mesafe kurallarına dikkat edin.
            Belirtiler ortaya çıktığında hemen sağlık ekibinizi bilgilendirin.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function BreastCancerInfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.videoCard}>
          <View style={[styles.videoThumb, { backgroundColor: '#9B59B6' }]}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>MEME KANSERİ ÖĞRENME MODÜLÜ</Text>
            <Text style={styles.videoSub}>Kapsamlı Bilgi ve Kaynaklar</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meme Kanseri Nedir?</Text>
          <Text style={styles.cardText}>
            Meme kanseri, meme dokusundaki hücrelerin kontrolsüz çoğalmasıyla oluşan bir hastalıktır. 
            Erken teşhis hayat kurtarır. Düzenli mamografi ve kendi kendine muayene önerilir.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tedavi Seçenekleri</Text>
          <Text style={styles.cardText}>
            • Cerrahi (mastektomi, lumpektomi){'\n'}
            • Kemoterapi{'\n'}
            • Radyoterapi{'\n'}
            • Hormon tedavisi{'\n'}
            • Hedefe yönelik tedavi
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 20, paddingBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: COLORS.gray, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  aboutHeader: { alignItems: 'center', marginBottom: 24 },
  aboutEmoji: { fontSize: 52, marginBottom: 12 },
  aboutTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.darkGray },
  aboutVersion: { fontSize: 14, color: COLORS.gray, marginTop: 4 },
  card: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.darkGray, marginBottom: 8 },
  cardText: { fontSize: 14, color: COLORS.darkGray, lineHeight: 22 },
  videoCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  videoThumb: {
    height: 150,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { fontSize: 40, color: COLORS.white },
  videoInfo: { padding: 14 },
  videoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.darkGray },
  videoSub: { fontSize: 12, color: COLORS.gray, marginTop: 4 },
});
