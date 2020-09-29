import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 2px;
  background: #232129;
  width: 100%;
  height: 418px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 5px 15px;
  align-items: center;
`;

export const Logo = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: 3px;
  border-color: rgba(148, 0, 211, 0.6);
`;

export const LogoContent = styled.Image`
    width: 100%;
    margin-bottom: 1px;
    resize-mode: stretch
    height: 300px;
`;

export const Content = styled.View`
  padding: 0px 15px;
  width: 100%;
  height: 55px;
`;

export const Title = styled.Text`
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
  font-family: 'RobotoSlab-Regular';
`;

export const SubTitle = styled.Text`
  color: #e3e3e3;
  font-size: 12px;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 10px;
`;

export const Locale = styled.View`
    flex-direction:row
    padding: 5px 15px;
`;

export const Text = styled.Text`
  color: #e3e3e3;
  font-family: 'RobotoSlab-Regular';
  margin-left: 5px;
`;

export const Footer = styled.TouchableOpacity`
  width: 100%;
  height: 46px;
  background: #660066;
  justify-content: center;
  align-items: center;
`;

export const FooterText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
