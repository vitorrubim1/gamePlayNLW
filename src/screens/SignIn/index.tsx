import React from 'react';
import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';

import IllustrationImage from '../../assets/illustration.png';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Background } from '../../components/Background';

import { useAuth } from '../../hooks/auth';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export const SignIn: React.FC = () => {
  const { user, signIn, loading } = useAuth();
  const { primary } = theme.colors;

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image source={IllustrationImage} style={styles.image} resizeMode="stretch" />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos
          </Text>

          {loading
            ? <ActivityIndicator color={primary} />
            : <ButtonIcon title="Entrar com discord" onPress={handleSignIn} />
          }
        </View>
      </View>
    </Background>
  );
}
