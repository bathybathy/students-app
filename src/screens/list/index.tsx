import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { navigationRef, screenStack } from '../../../App';
import { api } from '../../api';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { theme } from '../../theme';
import Animated, { Easing, SlideInLeft } from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/Loading';

export interface Item {
  nome: string;
  rua: string;
  url: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  _id: string;
}
interface IItem {
  item: Item;
}

const List = ({ route }: NativeStackScreenProps<screenStack>) => {
  const [list, setList] = useState<Array<Item>>([]);
  const getList = async () => {
    try {
      const { data } = await api.get('/');
      setList(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getList();
    }, []),
  );

  const handleEdit = (item: Item) => {
    navigationRef.navigate({ name: 'Cadastro', params: item });
  };

  const handleDelete = async (item: Item) => {
    try {
      await api.delete(`/delete/${item._id}`);
      Alert.alert(
        'Operação realizada com sucesso!',
        'O usuário foi excluído do sistema.',
      );
    } catch (error) {}
  };

  const renderItem = ({ item }: IItem) => {
    //prettier-ignore
    return (
      <Animated.View entering={SlideInLeft.easing(Easing.in(Easing.cubic))} style={styles.card}>
        {item?.url ? (<Image style={styles.image} source={{uri: `${item.url}`}} /> ): (<React.Fragment />)}
        <View style={styles.column}>
        
        <View style={styles.row}>
        <Text style={styles.label}>Nome: </Text><Text style={styles.name}>{item?.nome}</Text>
        </View>
        
        <View style={styles.row}>
        <Text style={styles.name}>{item?.rua}, {item?.numero}</Text>
        </View>
        
        {item?.complemento?( 
        <View style={styles.row}>
        <Text style={styles.label}>Complemento: </Text><Text style={styles.name}>{item?.complemento}</Text>
        </View>) 
        : (<React.Fragment />)}
        <View style={styles.row}>
        <Text style={styles.label}>CEP: </Text><Text style={styles.name}>{item?.cep}</Text>
        
        </View>
        

        <View style={styles.column}>
        <View style={styles.row}>
        <Button onPress={()=>handleEdit(item)} text='Editar' fill='filled' containerStyle={styles.button} />
        </View>
        <View style={styles.row}>
        <Button onPress={()=>handleDelete(item)} text='Deletar' fill='outline' containerStyle={styles.button} />
        </View>
        </View>
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <Title title="Alunos Cadastrados" />
      {list.length ? (
        <FlatList
          data={list}
          renderItem={renderItem}
          ListEmptyComponent={<React.Fragment />}
          extraData={list}
          refreshing={!list.length}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.marginHorizontal,
    marginVertical: theme.marginVertical,
    flex: 1,
    justifyContent: 'center',
  },

  card: {
    flexDirection: 'row',
    marginVertical: 16,
    elevation: 5,
    shadowColor: theme.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    backgroundColor: theme.darkerBackground,
    padding: 8,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 8,
  },
  label: {
    fontSize: 16,
  },
  name: {
    color: theme.accent,
    fontSize: 16,
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  column: {
    flexDirection: 'column',
  },
  button: {
    marginVertical: 4,
    width: 200,
  },
});
