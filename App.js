import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/context/AuthContext';
import { AppProvider, useApp } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import { SplashScreen, OnboardingScreen } from './src/screens/SplashOnboarding';

function Root() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => { checkOnboarding(); }, []);

  const checkOnboarding = async () => {
    try {
      const done = await AsyncStorage.getItem('onboardingDone');
      if (!done) setShowOnboarding(true);
    } catch (e) {}
  };

  const finishOnboarding = async () => {
    try { await AsyncStorage.setItem('onboardingDone', 'true'); } catch(e) {}
    setShowOnboarding(false);
  };

  if (showSplash) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </View>
    );
  }

  if (showOnboarding) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <OnboardingScreen onFinish={finishOnboarding} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <AppNavigator />
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </AppProvider>
  );
}
