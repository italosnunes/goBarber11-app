import React, { useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';

import {
  Container,
  Title,
  UserAvatar,
  UserAvatarButton,
  BackButton,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name:string;
  email:string;
  password:string;
  old_password: string;
  password_confirmation: string;
}
const Profile:React.FC = () =>  {
  const { user , updateUser} = useAuth();
  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null);
  const oldPasswordRef = useRef<TextInput>(null);
  const ConfirmationPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data:ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password:Yup.string().when('old_password',{
          is: val => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation:Yup.string()
          .when('old_password',{
            is:val => !!val.length,
            then:Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password')],'Senhas não conferem')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        email,
        password,
        old_password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? {
              old_password,
              password,
              password_confirmation
            }
          : {}),
      };

      const response = await api.put('/profile',formData);
      updateUser(response.data);

      Alert.alert('Perfil atualizado com sucesso!')

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert('Erro na atualização do perfil', 'Ocorreu um erro ao atualizar o perfil do usuário');
    }
  }, [navigation, updateUser]);

  const handleBack = useCallback(()=> {
    navigation.goBack();
  },[navigation])

  const handleUpdateAvatar = useCallback(()=>{
    ImagePicker.showImagePicker({
      title:'Selecione a foto...',
      cancelButtonTitle:'Cancelar',
      takePhotoButtonTitle:'Usar câmera',
      chooseFromLibraryButtonTitle:'Galeria',

    }, response => {
      if(response.didCancel){
        return;
      }

      if(response.error){
        Alert.alert('Erro ao atualizar o avatar');
        return;
      }

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri
      })

      //react-native-image-editor
      api.patch('users/avatar', data).then(res => {
        updateUser(res.data)
      });

    })
  },[updateUser, user.id])
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleBack}>
              <Icon name="chevron-left" size={24} color="#999591"/>
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{uri:user.avatar_url}}/>
            </UserAvatarButton>
            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form initialData={{name: user.name, email:user.email}} ref={formRef} onSubmit={handleSignIn}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailRef.current?.focus();
                }}

              />

              <Input
                ref={emailRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={()=> {
                  oldPasswordRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordRef}
                containerStyle={{marginTop: 16}}
                secureTextEntry
                textContentType="newPassword"
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                returnKeyType="next"
                onSubmitEditing={()=> passwordRef.current?.focus()}
              />

              <Input
                ref={passwordRef}
                secureTextEntry
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                returnKeyType="next"
                onSubmitEditing={()=> ConfirmationPasswordRef.current?.focus()}
              />

              <Input
                ref={ConfirmationPasswordRef}
                secureTextEntry
                textContentType="newPassword"
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar Senha"
                returnKeyType="send"
                onSubmitEditing={()=> formRef.current?.submitForm()}
              />

            </Form>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Salvar
            </Button>


          </Container>
        </ScrollView>


      </KeyboardAvoidingView>

      <View />
    </>
  );
}

export default Profile;
