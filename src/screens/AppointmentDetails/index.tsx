import React from 'react';
import { ImageBackground, Text, View, FlatList } from 'react-native';
import { Fontisto } from "@expo/vector-icons"
import { BorderlessButton } from 'react-native-gesture-handler';

import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Member } from '../../components/Member';

import bannerImage from '../../assets/banner.png'

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export function AppointmentDetails() {
  const members = [
    {
      id: '1',
      userName: 'Vitor',
      avatar_url: 'https://github.com/vitorrubim1.png',
      status: 'online'
    },
    {
      id: '2',
      userName: 'Lorem ipsum',
      avatar_url: 'https://github.com/vitorrubim1.png',
      status: 'offline'
    },
  ]

  return (
    <Background>
      <Header title="Detalhes" actions={
        <BorderlessButton>
          <Fontisto name="share" size={24} color={theme.colors.primary} />
        </BorderlessButton>}
      />

      <ImageBackground source={bannerImage} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.subtitle}>É hoje que vamos chegar ao challenger sem perder uma partida</Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3" />

      <FlatList
        data={members}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}

