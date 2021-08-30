import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from "@expo/vector-icons"

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface HeaderProps {
  title: string;
  actions?: ReactNode;
}

export function Header({ title, actions }: HeaderProps) {
  const { secondary100, secondary40, heading } = theme.colors;

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <LinearGradient colors={[secondary100, secondary40]} style={styles.container}>
      <BorderlessButton onPress={handleGoBack}>
        <Feather
          name="arrow-left"
          size={24}
          color={heading}
        />
      </BorderlessButton>

      <Text style={styles.title}>{title}</Text>

      {actions && <View>{actions}</View>}
    </LinearGradient>
  );
}
