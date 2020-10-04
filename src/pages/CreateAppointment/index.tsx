import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  BackButton,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePicker,
  OpenDatePickerText
} from './styles';
import { Platform } from 'react-native';


interface RouteParams {
  providerId:string;
}

export interface Provider{
  id:string;
  name:string;
  avatar_url:string;
}

interface AvailabilityItem {
  hour:number;
  available:boolean;
}

const CreateAppointment: React.FC = () => {
  const {user} = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();

  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectProvider, setSelectProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

  const handleSelectProvider = useCallback((providerId:string)=>{
    setSelectProvider(providerId);
  },[])

  const navigateBack = useCallback(()=>{
    goBack();
  },[goBack])

  useEffect(()=>{
    api.get('providers').then(response => {
      setProviders(response.data);
    })
  },[])

  useEffect(()=> {
    api.get(`/providers/${selectProvider}/day-availability`,{
      params:{
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth()+1,
        day: selectedDate.getDate()

      }
    }).then(response => {
      setAvailability(response.data);
    })
  },[selectedDate, selectProvider])

  const handleToggleDatePicker = useCallback(()=> {
    setShowDatePicker((state) => !state);
  },[])

  const handleDateChange = useCallback((event:any, date:Date | undefined)=> {
    if(Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if(date){
      setSelectedDate(date)
    }

  },[])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"/>
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{uri:user.avatar_url}}/>
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider=>provider.id}
          renderItem={({item:provider})=>(
            <ProviderContainer
              selected={provider.id === selectProvider}
              onPress={()=>(handleSelectProvider(providerId))}
            >
              <ProviderAvatar source={{uri: provider.avatar_url}}/>

              <ProviderName
                selected={provider.id === selectProvider}
              >
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePicker onPress={handleToggleDatePicker}>
          <OpenDatePickerText>Selecionar Data</OpenDatePickerText>
        </OpenDatePicker>
        {showDatePicker && (
          <DateTimePicker
          mode="date"
          display="calendar"
          onChange={handleDateChange}
          textColor="#f4ede8"
          value={selectedDate}
        />
        )}

      </Calendar>
    </Container>
  );
}

export default CreateAppointment;
