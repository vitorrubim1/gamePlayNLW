import React, { useEffect, useState } from 'react';
import { Fontisto } from "@expo/vector-icons"
import { useRoute } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native';

import { api } from '../../services/api';

import { AppointmentProps } from '../../components/Appointment';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import { ListHeader } from '../../components/ListHeader';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';

import bannerImage from '../../assets/banner.png'

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface Params {
  guildSelected: AppointmentProps;
}

interface GuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  async function fetchGuildWidget() {
    try {
      const response =
        await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

      setWidget(response.data);
    } catch {
      Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({ message, url: widget.instant_invite });
  }

  return (
    <Background>
      <Header title="Detalhes" actions={
        guildSelected.guild.owner &&
        <BorderlessButton onPress={handleShareInvitation}>
          <Fontisto name="share" size={24} color={theme.colors.primary} />
        </BorderlessButton>
      }
      />

      <ImageBackground source={bannerImage} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{guildSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? <Load /> : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total de ${widget.members.length >= 0 ? widget.members.length : 0}`}
          />

          <FlatList
            data={widget.members}
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
        </>
      )}
    </Background>
  );
}

