import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { signInSuccess, signFailure } from './actions';

import api from '../../../services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, 'sessions/deliveryman', { id });

    const { deliveryman } = response.data;

    if (!deliveryman) {
      Alert.alert('Erro no login', 'Entregador não Cadastrado');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(deliveryman));
  } catch (error) {
    Alert.alert('Erro no login', 'ID não cadastrado');

    yield put(signFailure());
  }
}

export function signOut() {}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
