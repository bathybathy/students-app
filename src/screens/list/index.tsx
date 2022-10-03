import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { navigationRef } from '../../../App';
import { api } from '../../api';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { theme } from '../../theme';
import Animated, { SlideInLeft } from 'react-native-reanimated';

interface IItem {
  nome: string;
  rua: string;
  url: string;
}

const List = () => {
  const [list, setList] = useState<Array<IItem>>([]);
  const getList = async () => {
    try {
      const { data } = await api.get('/');
      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(list);
  useEffect(() => {
    getList();
  }, []);

  const handleEdit = item => {
    navigationRef.navigate('Form', item);
  };

  const handleDelete = async item => {
    try {
      await api.delete(`/delete/${item._id}`);
      Alert.alert(
        'Operação realizada com sucesso!',
        'O usuário foi excluído do sistema.',
      );
    } catch (error) {}
  };

  const renderItem = ({ item }: IItem) => {
    console.log(item);

    //prettier-ignore
    return (
      <Animated.View entering={SlideInLeft} style={styles.card}>
        {item.url ? (<Image style={{width: 50, height: 50, borderRadius: 25, padding: 8}} source={{uri: `${item.url}`}} /> ): (<React.Fragment />)}
        <View style={{flexDirection: 'column'}}>
        
        <View style={styles.row}>
        <Text style={{ fontSize: 16}}>Nome: </Text><Text style={styles.name}>{item.nome}</Text>
        </View>
        
        <View style={styles.row}>
        <Text style={{ fontSize: 16}}>Rua: </Text><Text style={styles.name}>{item.rua}</Text>
        </View>
        
        <View style={styles.row}>
        <Text style={{ fontSize: 16}}>Numero: </Text><Text style={styles.name}>{item.numero}</Text>
        </View>
        
        {item.complemento?( 
        <View style={styles.row}>
        <Text style={{ fontSize: 16}}>Complemento: </Text><Text style={styles.name}>{item.complemento}</Text>
        </View>) 
        : (<React.Fragment />)}
        <View style={styles.row}>
        <Text style={{ fontSize: 16}}>CEP: </Text><Text style={styles.name}>{item.cep}</Text>
        
        </View>
        </View>

        <View style={styles.column}>
        <View style={styles.row}>
        <Button onPress={()=>handleEdit(item)} text='Editar' fill='filled' containerStyle={{width: 100,}} />
        </View>
        <View style={styles.row}>
        <Button onPress={()=>handleDelete(item)} text='Deletar' fill='outline' containerStyle={{marginVertical: 4, width: 100,}} />
        </View>
        </View>
      </Animated.View>
    );
  };
  return (
    <View style={styles.container}>
      <Title title="Alunos Cadastrados" />
      <FlatList
        data={list}
        renderItem={renderItem}
        ListEmptyComponent={<React.Fragment />}
        extraData={list}
        refreshing={!list.length}
      />
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
  },
  name: {
    color: theme.accent,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  column: {
    flexDirection: 'column',
  },
});
