import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { format } from 'date-fns'
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Content,
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
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import { Alert, Platform } from 'react-native';


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
  const { goBack , navigate} = useNavigation();

  const { providerId } = route.params as RouteParams;
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectProvider, setSelectProvider] = useState(providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
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

  const morningAvailability = useMemo(()=> {
    return availability
      .filter(({ hour })=>hour<12)
      .map(({hour,available})=> {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour),'HH:00')
        }
      })
  },[availability])

  const afternoonAvailability = useMemo(()=> {
    return availability
      .filter(({ hour })=>hour>=12)
      .map(({hour,available})=> {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour),'HH:00')
        }
      })
  },[availability])

  const handleSelectHour = useCallback((hour:number)=> {
    setSelectedHour(hour);
  },[]);

  const handleCreateAppointment = useCallback(async()=>{
    try {
      const date = new Date(selectedDate)
      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('appointments', {
        provider_id: selectProvider,
        date,
      })

      navigate('AppointmentCreated', { date: date.getTime()})
    } catch (error) {
      Alert.alert('Erro ao criar agendamento','Ocorreu um erro ao tentar criar o agendamento. Tente novamente')
    }
  },[navigate, selectedDate, selectedHour, selectProvider])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"/>
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{uri:user.avatar_url}}/>
      </Header>
      <Content>
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

      <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent >
              {morningAvailability.map(({hourFormatted,hour, available})=>(
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={() => handleSelectHour(hour)}
                >

                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}

            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(({hourFormatted, hour, available})=>(
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  available={available}
                  key={hourFormatted}
                  onPress={()=>handleSelectHour(hour)}
                >
                  <HourText selected={selectedHour === hour}>{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
      </Schedule>

      <CreateAppointmentButton onPress={handleCreateAppointment}>
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>

      </Content>


    </Container>
  );
}

export default CreateAppointment;
