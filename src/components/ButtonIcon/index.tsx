import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native';

import DiscordImage from '../../assets/discord.png';

import { styles } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export function ButtonIcon({ title, ...rest }: ButtonProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImage} style={styles.icon} />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  );
}