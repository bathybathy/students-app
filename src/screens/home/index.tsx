import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {navigationRef} from '../../../App';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Bem-vindos ao portal de alunos!</Text>
      <Pressable onPress={() => navigationRef.navigate('Form')}>
        <Text>Formulário</Text>
      </Pressable>
      <Pressable onPress={() => navigationRef.navigate('List')}>
        <Text>Lista</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
