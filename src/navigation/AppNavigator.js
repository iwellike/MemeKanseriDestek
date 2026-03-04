import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Text, TouchableOpacity } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SymptomsScreen from '../screens/SymptomsScreen';
import SymptomDetailScreen from '../screens/SymptomDetailScreen';
import ExpertScreen from '../screens/ExpertScreen';
import PatientExperiencesScreen from '../screens/PatientExperiencesScreen';
import SymptomCalendarScreen from '../screens/SymptomCalendarScreen';
import BloodTestScreen from '../screens/BloodTestScreen';
import MedicationScreen from '../screens/MedicationScreen';
import NutritionScreen from '../screens/NutritionScreen';
import PsychologyScreen from '../screens/PsychologyScreen';
import EmergencyScreen from '../screens/EmergencyScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ContactScreen, AboutScreen, CovidInfoScreen, BreastCancerInfoScreen } from '../screens/ExtraScreens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHS(colors) {
  return {
    headerStyle: { backgroundColor: colors.headerBg },
    headerTintColor: '#FFF',
    headerTitleStyle: { fontWeight: 'bold' },
  };
}

function MainTabs({ navigation }) {
  const { colors, t } = useApp();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.cardBg, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: t('home'),
          tabBarLabel: t('home'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🏠</Text>,
          ...getHS(colors),
          headerTitle: t('appName'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Emergency')} style={{ marginRight: 16 }}>
              <Text style={{ fontSize: 22 }}>🚨</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: t('dashboard'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text>,
          ...getHS(colors),
        }}
      />
      <Tab.Screen
        name="Medication"
        component={MedicationScreen}
        options={{
          title: t('medication'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>💊</Text>,
          ...getHS(colors),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('settings'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚙️</Text>,
          ...getHS(colors),
        }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  const { colors, t } = useApp();
  const hs = getHS(colors);
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Symptoms" component={SymptomsScreen} options={{ ...hs, title: t('symptoms') }} />
      <Stack.Screen name="SymptomDetail" component={SymptomDetailScreen} options={({ route }) => ({ ...hs, title: route.params?.symptom?.label || 'Detay' })} />
      <Stack.Screen name="Expert" component={ExpertScreen} options={{ ...hs, title: t('expert') }} />
      <Stack.Screen name="PatientExperiences" component={PatientExperiencesScreen} options={{ ...hs, title: t('patientExp') }} />
      <Stack.Screen name="SymptomCalendar" component={SymptomCalendarScreen} options={{ ...hs, title: t('calendar') }} />
      <Stack.Screen name="BloodTest" component={BloodTestScreen} options={{ ...hs, title: t('bloodTest') }} />
      <Stack.Screen name="Nutrition" component={NutritionScreen} options={{ ...hs, title: t('nutrition') }} />
      <Stack.Screen name="Psychology" component={PsychologyScreen} options={{ ...hs, title: t('psychology') }} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} options={{ ...hs, title: t('emergency'), headerStyle: { backgroundColor: '#E74C3C' } }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ ...hs, title: t('contact') }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ ...hs, title: t('about') }} />
      <Stack.Screen name="CovidInfo" component={CovidInfoScreen} options={{ ...hs, title: t('covid') }} />
      <Stack.Screen name="BreastCancerInfo" component={BreastCancerInfoScreen} options={{ ...hs, title: t('breastCancer') }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user } = useAuth();
  const { colors } = useApp();
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.cardBg,
          text: colors.textPrimary,
          border: colors.border,
          notification: colors.primary,
        },
      }}
    >
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
