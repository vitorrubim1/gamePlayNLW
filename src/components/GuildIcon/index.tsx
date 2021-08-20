import React from 'react';
import { Image } from 'react-native';

import Discord from '../../assets/discord.png';

import { styles } from './styles';

export function GuildIcon() {
  return (
    <Image
      source={Discord}
      resizeMode="cover"
      style={styles.image}
    />
  );
}
