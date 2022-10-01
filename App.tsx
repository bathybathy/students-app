import React from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as SCREEN from './src/screens';
import {Provider} from 'react-redux';
import {store} from './src/store';

export const navigationRef = createNavigationContainerRef<screenStack>();
const Stack = createNativeStackNavigator();

export type screenStack = {
  Home: undefined;
  Form: undefined;
  List: undefined;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={SCREEN.Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="List"
            component={SCREEN.List}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Form"
            component={SCREEN.Form}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
