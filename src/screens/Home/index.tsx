import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLLECTION_APPOINTMENTS } from '../../configs/database';

import { Load } from '../../components/Load';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { ListHeader } from '../../components/ListHeader';
import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentProps } from '../../components/Appointment';

import { styles } from './styles';

export function Home() {
  const [category, setCategory] = useState('');

  const navigation = useNavigation();

  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleSelectCategory(categoryId: string) {
    if (categoryId === category) {
      setCategory('');
    } else {
      setCategory(categoryId);
    }
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { guildSelected })
  }

  async function loadAppointment() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storageAppointments: AppointmentProps[] =
      storage ? JSON.parse(storage) : [];

    if (category) {
      setAppointments(
        storageAppointments.filter(item => item.category === category)
      );
    } else {
      setAppointments(storageAppointments);
    }

    setLoading(false);
  }

  //useFocusEffect: to render when returning via redirect with navigation
  useFocusEffect(
    useCallback(() => {
      loadAppointment();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={() => navigation.navigate('AppointmentCreate')} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleSelectCategory}
      />


      {loading ? <Load /> : (
        <>
          <ListHeader title="Partidas agendadas" subtitle={`Total de ${appointments.length}`} />

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={(({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            ))}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}