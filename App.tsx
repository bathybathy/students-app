import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SCREEN from './src/screens';
import { theme } from './src/theme';
import { IForm } from './src/screens/form';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

export const navigationRef = createNavigationContainerRef<screenStack>();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export type screenStack = {
  Home: undefined;
  Cadastro: IForm;
  Lista: undefined;
};

const Menu = () => {
  return (
    <Tab.Navigator sceneContainerStyle={{ backgroundColor: theme.background }}>
      <Tab.Screen
        name="Home"
        component={SCREEN.Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: theme.tabHighlight,
          tabBarInactiveTintColor: theme.accent,
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={SCREEN.Form}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="create-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: theme.tabHighlight,
          tabBarInactiveTintColor: theme.accent,
        }}
      />
      <Tab.Screen
        name="Lista"
        component={SCREEN.List}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-circle-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: theme.tabHighlight,
          tabBarInactiveTintColor: theme.accent,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <Menu />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
