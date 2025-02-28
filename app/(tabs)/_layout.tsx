import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * TabLayout
 * 
 * Définit un navigateur d'onglets avec des couleurs personnalisées, des icônes dynamiques
 * et une barre de statut.
 */
export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Configuration de la barre de statut */}
      <StatusBar style="light" />
      
      {/* Définition du navigateur d'onglets */}
      <Tabs
        screenOptions={{
          // Couleur active des icônes et labels
          tabBarActiveTintColor: '#FFD33D',  // Jaune vif pour l'icône et le texte actifs
          // Couleur inactive des icônes et labels
          tabBarInactiveTintColor: '#aaa',  // Gris clair pour l'icône et le texte inactifs
          // Style de l'en-tête pour une apparence cohérente avec le thème global
          headerStyle: { backgroundColor: '#25292e' },
          headerTintColor: '#fff',
          // Style de la barre d'onglets
          tabBarStyle: { backgroundColor: '#25292e' },
        }}
      >
        {/* Onglet "Home" */}
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
        
        {/* Onglet "About" */}
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
        
        {/* Onglet "Help" */}
        <Tabs.Screen
          name="help"
          options={{
            title: 'Help',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'help-circle' : 'help-circle-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        
        {/* Onglet "ProtocolePage" représenté par une icône d'urgence */}
        <Tabs.Screen
          name="Urgence"
          options={{
            title: 'Urgence',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="alert-circle"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
