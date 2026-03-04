import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LIGHT_COLORS, DARK_COLORS } from '../constants/colors';

const AppContext = createContext(null);

export const translations = {
  tr: {
    appName: 'Meme Kanseri Destek',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'Email',
    password: 'Parola',
    home: 'Ana Ekran',
    symptoms: 'Belirtiler',
    expert: 'Uzmana Sor',
    patientExp: 'Hasta Deneyimleri',
    calendar: 'Belirti Takvimi',
    bloodTest: 'Kan Tahlili',
    nutrition: 'Beslenme Rehberi',
    medication: 'İlaç Takibi',
    psychology: 'Psikolojik Destek',
    emergency: 'Acil Durum',
    contact: 'İletişim',
    about: 'Hakkında',
    covid: 'Covid-19 Bilgilendirme',
    breastCancer: 'Meme Kanseri Hakkında',
    darkMode: 'Karanlık Mod',
    language: 'Dil',
    settings: 'Ayarlar',
    save: 'Kaydet',
    send: 'Gönder',
    cancel: 'İptal',
    ok: 'Tamam',
    back: 'Geri',
    logout: 'Çıkış Yap',
    search: 'Ara...',
    loading: 'Yükleniyor...',
    noData: 'Veri bulunamadı.',
    dashboard: 'Özet',
    addMedication: 'İlaç Ekle',
    medicationName: 'İlaç Adı',
    dose: 'Doz',
    time: 'Saat',
    frequency: 'Sıklık',
    daily: 'Günlük',
    weekly: 'Haftalık',
    taken: 'Alındı',
    notTaken: 'Alınmadı',
    motivationTitle: 'Günlük Motivasyon',
    breathingExercise: 'Nefes Egzersizi',
    moodTracker: 'Ruh Hali Takibi',
    emergencyCall: 'ACİL YARDIM ÇAĞIR',
    emergencyHospital: 'En Yakın Hastane',
    emergencyDoctor: 'Doktoru Ara',
  },
  en: {
    appName: 'Breast Cancer Support',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    home: 'Home',
    symptoms: 'Symptoms',
    expert: 'Ask Expert',
    patientExp: 'Patient Experiences',
    calendar: 'Symptom Calendar',
    bloodTest: 'Blood Test',
    nutrition: 'Nutrition Guide',
    medication: 'Medication Tracker',
    psychology: 'Psychological Support',
    emergency: 'Emergency',
    contact: 'Contact',
    about: 'About',
    covid: 'Covid-19 Info',
    breastCancer: 'About Breast Cancer',
    darkMode: 'Dark Mode',
    language: 'Language',
    settings: 'Settings',
    save: 'Save',
    send: 'Send',
    cancel: 'Cancel',
    ok: 'OK',
    back: 'Back',
    logout: 'Logout',
    search: 'Search...',
    loading: 'Loading...',
    noData: 'No data found.',
    dashboard: 'Dashboard',
    addMedication: 'Add Medication',
    medicationName: 'Medication Name',
    dose: 'Dose',
    time: 'Time',
    frequency: 'Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    taken: 'Taken',
    notTaken: 'Not Taken',
    motivationTitle: 'Daily Motivation',
    breathingExercise: 'Breathing Exercise',
    moodTracker: 'Mood Tracker',
    emergencyCall: 'CALL EMERGENCY',
    emergencyHospital: 'Nearest Hospital',
    emergencyDoctor: 'Call Doctor',
  },
};

export const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('tr');
  const [colors, setColors] = useState(LIGHT_COLORS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const dark = await AsyncStorage.getItem('darkMode');
      const lang = await AsyncStorage.getItem('language');
      if (dark === 'true') { setIsDarkMode(true); setColors(DARK_COLORS); }
      if (lang) setLanguage(lang);
    } catch (e) {}
  };

  const toggleDarkMode = async () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    setColors(next ? DARK_COLORS : LIGHT_COLORS);
    await AsyncStorage.setItem('darkMode', String(next));
  };

  const toggleLanguage = async () => {
    const next = language === 'tr' ? 'en' : 'tr';
    setLanguage(next);
    await AsyncStorage.setItem('language', next);
  };

  const t = (key) => translations[language][key] || key;

  return (
    <AppContext.Provider value={{ isDarkMode, toggleDarkMode, language, toggleLanguage, colors, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
