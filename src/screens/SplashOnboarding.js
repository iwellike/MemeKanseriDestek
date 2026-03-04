import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LIGHT_COLORS } from '../constants/colors';

const C = LIGHT_COLORS;

export function SplashScreen({ onFinish }) {
  const scale = useRef(new Animated.Value(0.3)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, { transform: [{ scale }], opacity }]}>
        <Text style={styles.emoji}>🎗️</Text>
        <Text style={styles.title}>Meme Kanseri</Text>
        <Text style={styles.subtitle}>Destek Mobil</Text>
      </Animated.View>
      <Text style={styles.tagline}>Yanınızdayız 💙</Text>
    </View>
  );
}

const onboardingData = [
  {
    emoji: '🎗️',
    title: 'Hoş Geldiniz',
    desc: 'Meme kanseri sürecinde size destek olmak için buradayız.',
    bg: C.primary,
  },
  {
    emoji: '🩺',
    title: 'Belirtilerinizi Takip Edin',
    desc: 'Kemoterapi yan etkilerini kolayca kaydedin ve yönetin.',
    bg: '#9B59B6',
  },
  {
    emoji: '💬',
    title: 'Uzmana Sorun',
    desc: 'Aklınızdaki soruları uzman ekibimize iletin.',
    bg: '#E91E8C',
  },
  {
    emoji: '💊',
    title: 'İlaçlarınızı Unutmayın',
    desc: 'İlaç takip sistemi ile tedavinizi düzenli sürdürün.',
    bg: '#E67E22',
  },
];

export function OnboardingScreen({ onFinish }) {
  const [index, setIndex] = React.useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  const goNext = () => {
    Animated.sequence([
      Animated.timing(slideAnim, { toValue: -width, duration: 250, useNativeDriver: true }),
    ]).start(() => {
      if (index < onboardingData.length - 1) {
        slideAnim.setValue(width);
        setIndex(index + 1);
        Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true }).start();
      } else {
        onFinish();
      }
    });
  };

  const item = onboardingData[index];

  return (
    <View style={[styles.onboarding, { backgroundColor: item.bg }]}>
      <Animated.View style={[styles.onboardContent, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.onboardEmoji}>{item.emoji}</Text>
        <Text style={styles.onboardTitle}>{item.title}</Text>
        <Text style={styles.onboardDesc}>{item.desc}</Text>
      </Animated.View>

      {/* Dots */}
      <View style={styles.dots}>
        {onboardingData.map((_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.onboardActions}>
        <Text style={styles.skipText} onPress={onFinish}>Atla</Text>
        <View style={styles.nextBtn} >
          <Text style={styles.nextBtnText} onPress={goNext}>
            {index === onboardingData.length - 1 ? 'Başla 🚀' : 'İleri →'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: { alignItems: 'center' },
  emoji: { fontSize: 80, marginBottom: 16 },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  subtitle: { color: '#fff', fontSize: 20, opacity: 0.9 },
  tagline: { position: 'absolute', bottom: 60, color: '#fff', fontSize: 18 },

  onboarding: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  onboardContent: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  onboardEmoji: { fontSize: 90, marginBottom: 24 },
  onboardTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  onboardDesc: { color: '#fff', fontSize: 16, textAlign: 'center', opacity: 0.9, lineHeight: 24 },
  dots: { flexDirection: 'row', gap: 8, marginBottom: 40 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: '#fff', width: 24 },
  onboardActions: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' },
  skipText: { color: 'rgba(255,255,255,0.7)', fontSize: 16 },
  nextBtn: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 25, paddingHorizontal: 28, paddingVertical: 14 },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
