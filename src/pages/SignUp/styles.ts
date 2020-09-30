import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const Image = styled.Image`
  width: 180px;
  height: 180px;
  margin-top: 40px;
  margin-bottom: 0px;
  justify-content: center;
`;
export const Button = styled.TouchableOpacity`
  background: rgba(66, 00, 66, 0.9);
  width: 100%;
  height: 55px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

export const Title = styled.Text`
  color: #ddd;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0 20px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-family: 'RobotoSlab-Medium';
`;

export const SignLink = styled.TouchableOpacity`
  margin-right: 5px;
  align-self: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const SignLinkText = styled.Text`
  color: #ddd;
  font-weight: bold;
  font-size: 12px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top-width: 0.5px;
  border-color: #232129;
  padding: 8px 0 ${8 + getBottomSpace()}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ddd;
  font-weight: bold;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
