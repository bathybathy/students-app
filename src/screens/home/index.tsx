import React from 'react';
import { StyleSheet, Text, Image, Pressable, View } from 'react-native';
import Animated, { Easing, SlideInLeft } from 'react-native-reanimated';
import { navigationRef } from '../../../App';
import Button from '../../components/Button';
import Title from '../../components/Title';
import { theme } from '../../theme';

const Home = () => {
  return (
    <Animated.View
      entering={SlideInLeft.duration(600).easing(Easing.in(Easing.cubic))}
      style={styles.container}>
      <Title title={'Cadastro de alunos'} />
      <Image source={require('../../assets/logo.png')} />
      <View style={{}}>
        <Button
          text="Formulário"
          onPress={() => navigationRef.navigate('Cadastro')}
          containerStyle={{ width: 250, marginVertical: 4 }}
        />

        <Button
          text="Lista de alunos"
          onPress={() => navigationRef.navigate('Lista')}
          fill="outline"
          containerStyle={{ width: 250, marginVertical: 4 }}
        />
      </View>
    </Animated.View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: theme.marginHorizontal,
    marginVertical: theme.marginVertical,
  },
});
