import React from 'react';
import { View, Image } from 'react-native';

import DiscordSvg from '../../assets/discord.svg';
import { styles } from './styles';

const { CDN_IMAGE } = process.env;

interface GuildIconProps {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: GuildIconProps) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`

  return (
    <View style={styles.container}>
      {iconId ? (
        <Image
          source={{ uri }}
          resizeMode="cover"
          style={styles.image}
        />
      ) : (
        <DiscordSvg width={40} height={40} />
      )}
    </View>
  );
}
