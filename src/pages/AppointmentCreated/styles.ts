import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: #312e38;
`;

export const Header = styled.View`
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);

  ${Platform.select({
    ios: css`
      margin-top: 40px;
    `,
    android: css`
      margin-top: 0px;
    `,
  })}
`;

export const Title = styled.Text`
  color: #ddd;
  font-weight: bold;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 0 },
})`
  margin-top: -10px;
`;
