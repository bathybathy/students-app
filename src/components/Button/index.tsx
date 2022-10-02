import React, { useEffect } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '../../theme';

interface IProps {
  text: string;
  onPress?: (params?: any) => void;
  containerStyle?: StyleProp<ViewStyle>;
  fill?: 'filled' | 'outline';
  disabled?: boolean;
}

const fillThemes = {
  filled: {
    backgroundColor: theme.highlight,
    borderColor: theme.highlight,
    backgroundDisabled: theme.darkerHighlight,
    textColor: theme.background,
  },
  outline: {
    backgroundColor: theme.background,
    borderColor: theme.highlight,
    backgroundDisabled: theme.darkerBackground,
    textColor: theme.highlight,
  },
};

const Button: React.FC<IProps> = ({
  text = '',
  onPress,
  containerStyle,
  fill = 'filled',
  disabled = false,
}) => {
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const animValue = useSharedValue(disabled ? 0 : 1);

  useEffect(() => {
    animValue.value = withTiming(disabled ? 0 : 1, { duration: 200 });
  }, [disabled]);

  const getBackgroundColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animValue.value,
      [0, 1],
      [fillThemes[fill].backgroundDisabled, fillThemes[fill].backgroundColor],
    ),
    borderColor: interpolateColor(
      animValue.value,
      [0, 1],
      [fillThemes[fill].backgroundDisabled, fillThemes[fill].borderColor],
    ),
  }));

  return (
    <AnimatedPressable
      onPress={() => onPress?.()}
      style={[styles.container, getBackgroundColor, containerStyle]}
      disabled={disabled}>
      <Text
        style={[
          { color: fillThemes[fill].textColor },
          fill === 'outline' && { fontWeight: 'bold' },
        ]}>
        {text}
      </Text>
    </AnimatedPressable>
  );
};
export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 2,
  },
});
