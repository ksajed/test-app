import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';

/**
 * TabLayout
 * 
 * Définit un navigateur d'onglets professionnel avec des couleurs personnalisées, des icônes dynamiques
 * et une barre de statut.
 */
export default function TabLayout() {
  return (
    <>
      {/* Configuration de la barre de statut */}
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          // Couleur active des icônes et labels
          tabBarActiveTintColor: '#FFD33D',
          // Couleur inactive des icônes et labels
          tabBarInactiveTintColor: '#aaa',
          // Style de l'en-tête pour une apparence cohérente
          headerStyle: { backgroundColor: '#25292e' },
          headerTintColor: '#fff',
          // Style de la barre d'onglets
          tabBarStyle: { backgroundColor: '#25292e' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'information-circle' : 'information-circle-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
