import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  color: #ddd;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;

`;

export const UserAvatar = styled.Image`

  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-selft: center;
`;

