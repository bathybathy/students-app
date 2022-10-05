import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import * as SCREEN from './src/screens';
import { theme } from './src/theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Item } from './src/screens/list';

export const navigationRef = createNavigationContainerRef<screenStack>();

const Tab = createBottomTabNavigator();

export type screenStack = {
  Home: undefined;
  Cadastro: Item | {};
  Lista: undefined;
};

const Menu = () => {
  return (
    <Tab.Navigator sceneContainerStyle={styles.container}>
      <Tab.Screen
        name="Home"
        component={SCREEN.Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: theme.tabHighlight,
          tabBarInactiveTintColor: theme.accent,
        }}
      />
      <Tab.Screen
        name="Cadastro"
        component={SCREEN.Form}
        listeners={{ tabPress: () => navigationRef.navigate('Cadastro', {}) }}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="create-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: theme.tabHighlight,
          tabBarInactiveTintColor: theme.accent,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Lista"
        component={SCREEN.List}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="list-circle-outline" size={20} color={color} />
          ),
          tabBarActiveTintColor: theme.tabHighlight,
          tabBarInactiveTintColor: theme.accent,
          unmountOnBlur: true,
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
  container: {
    backgroundColor: theme.background,
  },
});

export default App;
