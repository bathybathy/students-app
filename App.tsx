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

export const navigationRef = createNavigationContainerRef<screenStack>();
const Stack = createNativeStackNavigator();

export type screenStack = {
  Home: undefined;
  Form: IForm;
  List: undefined;
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar barStyle={'dark-content'} />
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: theme.background },
        }}>
        <Stack.Screen
          name="Home"
          component={SCREEN.Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="List"
          component={SCREEN.List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Form"
          component={SCREEN.Form}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
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
