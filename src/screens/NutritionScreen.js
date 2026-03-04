import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, TextInput, ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';

const categories = ['Tümü', 'Önerilen', 'Kaçınılacak', 'Tarifler', 'İpuçları'];

const nutritionData = [
  {
    id: '1', category: 'Önerilen', emoji: '🥦',
    title: 'Yeşil Sebzeler',
    desc: 'Brokoli, ıspanak ve lahana antioksidan açısından zengindir. Hücre hasarını azaltmaya yardımcı olur.',
    tag: 'Antioksidan',
  },
  {
    id: '2', category: 'Önerilen', emoji: '🐟',
    title: 'Yağlı Balık',
    desc: 'Somon, uskumru ve sardalya omega-3 yağ asitleri içerir. İltihabı azaltır.',
    tag: 'Omega-3',
  },
  {
    id: '3', category: 'Önerilen', emoji: '🫐',
    title: 'Yaban Mersini',
    desc: 'Güçlü antioksidan olan antosiyanin içerir. Bağışıklık sistemini güçlendirir.',
    tag: 'Antioksidan',
  },
  {
    id: '4', category: 'Önerilen', emoji: '🧄',
    title: 'Sarımsak',
    desc: 'Allissin bileşiği ile doğal antibiyotik özelliği vardır.',
    tag: 'Antibakteriyal',
  },
  {
    id: '5', category: 'Önerilen', emoji: '🥜',
    title: 'Kuruyemişler',
    desc: 'Ceviz ve badem sağlıklı yağ, protein ve E vitamini içerir.',
    tag: 'Protein',
  },
  {
    id: '6', category: 'Kaçınılacak', emoji: '🍔',
    title: 'İşlenmiş Et',
    desc: 'Sucuk, salam gibi işlenmiş etler kanser riskini artırabilir. Sınırlandırılmalıdır.',
    tag: '⚠️ Dikkat',
  },
  {
    id: '7', category: 'Kaçınılacak', emoji: '🧂',
    title: 'Fazla Tuz',
    desc: 'Yüksek sodyum alımı sağlığı olumsuz etkiler. Günlük 5g altında tutun.',
    tag: '⚠️ Dikkat',
  },
  {
    id: '8', category: 'Kaçınılacak', emoji: '🍺',
    title: 'Alkol',
    desc: 'Alkol tüketimi meme kanseri riskini artırır. Tedavi sürecinde kesinlikle önerilmez.',
    tag: '🚫 Kaçın',
  },
  {
    id: '9', category: 'Tarifler', emoji: '🥣',
    title: 'Güçlendirici Smoothie',
    desc: 'Ispanak + muz + yaban mersini + zencefil + zeytinyağı karıştırın. Sabah için ideal.',
    tag: '⏱️ 5 dk',
  },
  {
    id: '10', category: 'Tarifler', emoji: '🥗',
    title: 'Antioksidan Salata',
    desc: 'Roka + ceviz + nar + zeytinyağı + limon. Hafif ve besleyici.',
    tag: '⏱️ 10 dk',
  },
  {
    id: '11', category: 'İpuçları', emoji: '💧',
    title: 'Bol Su İçin',
    desc: 'Günde en az 8 bardak su tüketin. Kemoterapi sürecinde hidrasyon çok önemlidir.',
    tag: '💡 İpucu',
  },
  {
    id: '12', category: 'İpuçları', emoji: '🍽️',
    title: 'Küçük ve Sık Öğünler',
    desc: 'Bulantıyı azaltmak için günde 5-6 küçük öğün tüketin. Büyük porsiyonlardan kaçının.',
    tag: '💡 İpucu',
  },
];

export default function NutritionScreen() {
  const { colors } = useApp();
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [search, setSearch] = useState('');

  const filtered = nutritionData.filter(item =>
    (activeCategory === 'Tümü' || item.category === activeCategory) &&
    (item.title.toLowerCase().includes(search.toLowerCase()) ||
     item.desc.toLowerCase().includes(search.toLowerCase()))
  );

  const tagColor = (tag) => {
    if (tag.includes('⚠️') || tag.includes('🚫')) return '#FFEBEE';
    if (tag.includes('💡')) return '#E8F5E9';
    if (tag.includes('⏱️')) return '#E3F2FD';
    return '#E0F7FA';
  };

  const tagTextColor = (tag) => {
    if (tag.includes('⚠️') || tag.includes('🚫')) return '#C62828';
    if (tag.includes('💡')) return '#2E7D32';
    if (tag.includes('⏱️')) return '#1565C0';
    return '#00695C';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Banner */}
      <View style={[styles.banner, { backgroundColor: colors.green }]}>
        <Text style={styles.bannerEmoji}>🥗</Text>
        <View>
          <Text style={styles.bannerTitle}>Beslenme Rehberi</Text>
          <Text style={styles.bannerSub}>Kemoterapi sürecinde sağlıklı beslenin</Text>
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
        <Text>🔍 </Text>
        <TextInput
          style={[styles.searchInput, { color: colors.textPrimary }]}
          placeholder="Besin ara..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catBtn, { backgroundColor: activeCategory === cat ? colors.primary : colors.cardBg, borderColor: colors.border }]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={{ color: activeCategory === cat ? '#fff' : colors.textPrimary, fontWeight: '600', fontSize: 13 }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 40 }}>🥗</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 10 }}>Sonuç bulunamadı.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <View style={styles.cardHeaderText}>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                <View style={[styles.tagBadge, { backgroundColor: tagColor(item.tag) }]}>
                  <Text style={[styles.tagText, { color: tagTextColor(item.tag) }]}>{item.tag}</Text>
                </View>
              </View>
            </View>
            <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  banner: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  bannerEmoji: { fontSize: 36 },
  bannerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 13 },
  searchBar: { flexDirection: 'row', alignItems: 'center', margin: 12, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: 15 },
  catScroll: { marginBottom: 8 },
  catBtn: { borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1 },
  list: { padding: 12, paddingBottom: 30 },
  card: { borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  cardEmoji: { fontSize: 32 },
  cardHeaderText: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  tagBadge: { alignSelf: 'flex-start', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginTop: 4 },
  tagText: { fontSize: 11, fontWeight: '600' },
  cardDesc: { fontSize: 14, lineHeight: 21 },
  empty: { alignItems: 'center', paddingTop: 60 },
});
