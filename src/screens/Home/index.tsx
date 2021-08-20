import React, { useState } from 'react';
import { View, FlatList } from 'react-native'

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { Appointment } from '../../components/Appointment';
import { CategorySelect } from '../../components/CategorySelect';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'Lorem nobis accusamus, architecto doloremque sed, dolor facilis. Odit magnam autem, debitis quasi laudantium expedita facilis inventore.'
    }
  ];

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

        <View style={styles.content}>
          <ListHeader title="Partidas agendadas" subtitle="Total 6" />

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={(({ item }) => (
              <Appointment data={item} />
            ))}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Background>
  );
}