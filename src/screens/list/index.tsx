import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { api } from '../../api';
import { theme } from '../../theme';

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
    if (!list.length) {
      getList();
    }
  }, []);

  const renderItem = ({ item }: IItem) => {
    console.log(item);

    //prettier-ignore
    return (
      <View style={styles.card}>
        {item.url ? (<Image style={{width: 50, height: 50, borderRadius: 25, padding: 8}} source={{uri: `${item.url}`}} /> ): (<React.Fragment />)}
        <Text style={{paddingLeft: 8, fontSize: 16}}>Nome: </Text><Text style={styles.name}>{item.nome}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text>oi</Text>
      <FlatList
        data={list}
        renderItem={renderItem}
        ListEmptyComponent={<React.Fragment />}
        extraData={list}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.marginHorizontal,
    marginVertical: theme.marginVertical,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  name: {
    color: theme.accent,
    fontSize: 16,
  },
});
