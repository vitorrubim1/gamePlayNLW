import React from 'react';
import { View, Text, Image } from 'react-native';

import IllustrationImage from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';

import { styles } from './styles';

export const SignIn: React.FC = () => {
	return (
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

				<ButtonIcon title="Entrar com discord" activeOpacity={0.7} />
			</View>
		</View>
	);
}
