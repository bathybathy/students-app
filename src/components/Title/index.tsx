import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

interface IProps {
  title: string;
}

const Title: React.FC<IProps> = ({ title = '' }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: theme.highlight,
  },
});
export default Title;
