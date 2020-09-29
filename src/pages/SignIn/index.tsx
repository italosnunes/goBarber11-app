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
import logo from '../../assets/logo.png'
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  Button,
  Text,
  Image,
  InputView,
  InputText,
  SignLink,
  SignLinkText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn:React.FC = () =>  {

  const formRef = useRef(null);

  const { signIn } = useAuth();

  const navigation = useNavigation();

  const handleSignIn = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current.setErrors(errors);
          return;
        }

        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login');
      }
    },
    [signIn]
  );

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
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                onPress={() => {
                  formRef.current.submitForm();
                }}
              >
                <Text>Entrar</Text>
              </Button>
            </Form>

            <SignLink>
              <SignLinkText>Esqueci minha senha</SignLinkText>
            </SignLink>
          </Container>
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
              <Icon name="log-in" size={20} color="#ff9000" />
              <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
        </ScrollView>
      </KeyboardAvoidingView>
      <View />
    </>
  );
}

export default SignIn;

