import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import MapScreen from './MapScreen';
import GuideScreen from './GuideScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PraiaStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0284C7' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="ListaPraias" 
        component={HomeScreen} 
        options={{ title: '🌊 Balneabilidade PE' }} 
      />
      <Stack.Screen 
        name="Detalhes" 
        component={DetailScreen} 
        options={({ route }) => ({ 
          title: route.params?.praia?.nome_praia || 'Detalhes da Praia' 
        })} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'PraiasTab',
          tabBarActiveTintColor: '#0284C7',
          tabBarInactiveTintColor: '#64748B',
          tabBarStyle: { paddingBottom: 6, paddingTop: 6, height: 60 },
          tabBarIcon: ({ focused }) => {
            let icon = '🏖️';
            if (route.name === 'PraiasTab') icon = '🏖️';
            if (route.name === 'Mapa') icon = '🗺️';
            if (route.name === 'Guia') icon = '📘';
            return <Text style={{ fontSize: 20 }}>{icon}</Text>;
          },
        })}
      >
        <Tab.Screen 
          name="PraiasTab" 
          component={PraiaStack} 
          options={{ tabBarLabel: 'Praias' }} 
        />
        <Tab.Screen 
          name="Mapa" 
          component={MapScreen} 
          options={{
            title: 'Mapa Interativo',
            headerStyle: { backgroundColor: '#0284C7' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
        <Tab.Screen 
          name="Guia" 
          component={GuideScreen} 
          options={{
            title: 'Orientações',
            headerStyle: { backgroundColor: '#0284C7' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
