import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, SafeAreaView,
  Alert, FlatList,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { expertQuestions } from '../data/mockData';

export default function ExpertScreen({ navigation }) {
  const [view, setView] = useState('main'); // 'main', 'select', 'text', 'previous'
  const [question, setQuestion] = useState('');
  const [questions, setQuestions] = useState(expertQuestions);

  const handleSend = () => {
    if (!question.trim()) {
      Alert.alert('Uyarı', 'Lütfen sorunuzu yazın.');
      return;
    }
    const newQ = {
      id: Date.now().toString(),
      question,
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'Beklemede',
      answer: null,
    };
    setQuestions(prev => [newQ, ...prev]);
    setQuestion('');
    Alert.alert('Başarılı', 'Sorunuz gönderildi!', [
      { text: 'Tamam', onPress: () => setView('main') },
    ]);
  };

  if (view === 'select') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>Uzmana sormak istediğiniz sorunun tipini seçiniz</Text>
        </View>
        <TouchableOpacity style={styles.typeRow} onPress={() => setView('text')}>
          <View style={styles.typeIcon}><Text>📝</Text></View>
          <View style={styles.typeInfo}>
            <Text style={styles.typeTitle}>Yazılı</Text>
            <Text style={styles.typeDesc}>Sorunuzu metinsel olarak hazırlayabilirsiniz.</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity style={styles.typeRow} onPress={() => Alert.alert('Bilgi', 'Sesli kayıt özelliği yakında!')}>
          <View style={styles.typeIcon}><Text>🎤</Text></View>
          <View style={styles.typeInfo}>
            <Text style={styles.typeTitle}>Sesli</Text>
            <Text style={styles.typeDesc}>Sorunuzu uygulamamız üzerinden sesli kayıt şeklinde gönderebilirsiniz.</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => setView('main')}>
          <Text style={styles.backBtnText}>← Geri</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (view === 'text') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>Sormak istediğiniz soruyu yazınız.</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={6}
            placeholder="Sorunuzu buraya yazın..."
            value={question}
            onChangeText={setQuestion}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendBtnText}>Soruyu Gönder  ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn} onPress={() => setView('select')}>
            <Text style={styles.backBtnText}>← Geri</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (view === 'previous') {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={questions}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.content}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>Henüz soru sorulmadı.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={styles.questionDate}>{item.date} · {item.status}</Text>
              {item.answer && (
                <View style={styles.answerBox}>
                  <Text style={styles.answerLabel}>Uzman Yanıtı:</Text>
                  <Text style={styles.answerText}>{item.answer}</Text>
                </View>
              )}
            </View>
          )}
          ListHeaderComponent={
            <TouchableOpacity style={styles.backBtn} onPress={() => setView('main')}>
              <Text style={styles.backBtnText}>← Geri</Text>
            </TouchableOpacity>
          }
        />
      </SafeAreaView>
    );
  }

  // Main view
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setView('select')}>
          <Text style={styles.mainBtnEmoji}>❓</Text>
          <Text style={styles.mainBtnText}>Uzmana Soru Sor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.mainBtn, { backgroundColor: COLORS.primary }]} onPress={() => setView('previous')}>
          <Text style={styles.mainBtnEmoji}>📋</Text>
          <Text style={styles.mainBtnText}>Geçmiş Sorularım</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { padding: 20 },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    gap: 16,
  },
  mainBtn: {
    backgroundColor: '#9B59B6',
    borderRadius: 14,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  mainBtnEmoji: { fontSize: 28, marginBottom: 8 },
  mainBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  bubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 16,
    margin: 20,
  },
  bubbleText: { color: COLORS.white, fontSize: 15 },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  typeIcon: { width: 36, alignItems: 'center', marginRight: 12 },
  typeInfo: { flex: 1 },
  typeTitle: { fontSize: 16, fontWeight: '600', color: COLORS.darkGray },
  typeDesc: { fontSize: 13, color: COLORS.gray, marginTop: 2 },
  chevron: { fontSize: 22, color: COLORS.gray },
  separator: { height: 1, backgroundColor: COLORS.border, marginHorizontal: 20 },
  label: { fontSize: 15, color: COLORS.darkGray, marginBottom: 8 },
  divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 16 },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  sendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  sendBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '600' },
  backBtn: { paddingVertical: 12 },
  backBtnText: { color: COLORS.primary, fontSize: 15 },
  questionCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  questionText: { fontSize: 15, color: COLORS.darkGray, fontWeight: '500' },
  questionDate: { fontSize: 12, color: COLORS.gray, marginTop: 6 },
  answerBox: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  answerLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginBottom: 4 },
  answerText: { fontSize: 13, color: COLORS.darkGray },
  center: { alignItems: 'center', paddingTop: 40 },
  emptyText: { color: COLORS.gray, fontSize: 15 },
});
