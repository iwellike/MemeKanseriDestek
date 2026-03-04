# 🎗️ Meme Kanseri Destek Mobil Uygulaması

React Native + Expo ile geliştirilmiş meme kanseri destek mobil uygulaması.

## 📱 Ekranlar

| Ekran | Açıklama |
|-------|----------|
| Giriş / Kayıt | Kullanıcı kimlik doğrulama |
| Ana Ekran | Tüm modüllere erişim menüsü |
| Belirtiler | Kemoterapi yan etki listesi ve detayları |
| Uzmana Sor | Yazılı/sesli soru gönderme + geçmiş sorular |
| Hasta Deneyimleri | Video listesi |
| Belirti Takvimi | Belirti kaydı ekleme ve takip |
| Kan Tahlili | Dosya yükleme simülasyonu |
| Covid-19 Bilgilendirme | Bilgilendirme modülü |
| Meme Kanseri Hakkında | Öğrenme modülü |
| İletişim | İletişim formu |
| Hakkında | Uygulama bilgileri |

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npx expo start
```

## 📋 Teknoloji Stack

- **Framework**: React Native + Expo (~51)
- **Navigasyon**: React Navigation v6 (Stack Navigator)
- **State Management**: React Context API (AuthContext)
- **Stil**: StyleSheet API

## 🎯 Proje Gereksinimleri

✅ **Temel Navigasyon**: 10+ ekran Stack Navigator ile  
✅ **Veri Akışı**: 
  - Liste–Detay: Belirtiler → Belirti Detayı
  - Form–Kayıt: Belirti Takvimi kayıt formu, Uzmana Sor
  - Filtreleme: Sorular listesi  
✅ **Loading State**: AuthContext'te loading göstergesi  
✅ **Empty State**: Tüm listelerde boş durum mesajları  
✅ **Hata Durumu**: Alert ile hata mesajları  

## 🔑 Test Hesapları

```
Email: hemsire1@gmail.com
Parola: hemsire1

Email: hasta1@gmail.com  
Parola: hasta1
```

Veya yeni hesap oluşturabilirsiniz.

## 📁 Proje Yapısı

```
MemeKanseriDestek/
├── App.js                          # Giriş noktası
├── app.json                        # Expo konfigürasyonu
├── package.json
├── babel.config.js
└── src/
    ├── constants/
    │   └── colors.js               # Renk sabitleri
    ├── context/
    │   └── AuthContext.js          # Auth state yönetimi
    ├── data/
    │   └── mockData.js             # Mock veriler
    ├── navigation/
    │   └── AppNavigator.js         # Navigasyon yapısı
    └── screens/
        ├── LoginScreen.js
        ├── RegisterScreen.js
        ├── HomeScreen.js
        ├── SymptomsScreen.js
        ├── SymptomDetailScreen.js
        ├── ExpertScreen.js
        ├── PatientExperiencesScreen.js
        ├── SymptomCalendarScreen.js
        ├── BloodTestScreen.js
        └── ExtraScreens.js         # Contact, About, CovidInfo, BreastCancerInfo
```
