import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/loading.gif')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
  },
});
export default Loading;
