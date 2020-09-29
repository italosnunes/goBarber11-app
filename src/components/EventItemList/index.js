import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {Container,Header, Logo, LogoContent, Content, Title, SubTitle, Locale, Text, Footer, FooterText} from './styles';


export default function EventItemList(){
    
    navigation = useNavigation();

    function handleEventDetail(){
        navigation.navigate('EventDetail');
    }
    
    return(
        <Container>
            <Header>
                <Logo source={{
                    uri: 'https://user-images.githubusercontent.com/46608041/81451873-dc29cd80-915b-11ea-98f7-39630d4c8d74.jpeg',
                  }}/>
                <Content>
                    <Title>Lampions League</Title>
                    <SubTitle>
                        Arena Unifacisa Campina Grande / PB
                    </SubTitle>
                </Content>
            </Header>
            
            <LogoContent source={{uri:'https://user-images.githubusercontent.com/46608041/81452366-092ab000-915d-11ea-8e19-d669a690c6d1.jpeg'}}/>
            <Footer onPress={handleEventDetail}>
                  <FooterText>Acessar Evento</FooterText>
            </Footer>
        </Container>
    )
}