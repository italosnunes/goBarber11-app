import React, { useCallback, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import {
  Container,
  Button,
  Text,
  Image,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignUp:React.FC = () =>  {
  const formRef = useRef(null);

  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      console.log('chegou aqui');
      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('chegou aqui');
      navigation.navigate('About');
      /* await SignIn({
        email: data.email,
        password: data.password,
      }); */
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current.setErrors(errors);
        return;
      }

      Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login');
    }
  }, []);

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
            <Image source={logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                onPress={() => {
                  formRef.current.submitForm();
                }}
              >
                <Text>Criar Conta</Text>
              </Button>
            </Form>

            <CreateAccountButton onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={20} color="#fff" />
              <CreateAccountButtonText>
                Já tenho uma conta
              </CreateAccountButtonText>
            </CreateAccountButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <View />
    </>
  );
}

export default SignUp;
