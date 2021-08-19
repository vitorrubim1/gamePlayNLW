import React, { useState } from 'react';
import { View } from 'react-native'

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('category');

  function handleSelectCategory(categoryId: string) {
    if (categoryId === category) {
      setCategory('');
    } else {
      setCategory(categoryId);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd />
        </View>

        <CategorySelect categorySelected={category} setCategory={handleSelectCategory} />
      </View>
    </Background>
  );
}