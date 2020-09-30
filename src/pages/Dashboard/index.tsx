import React, { useState } from 'react';
import { Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container, Header, Title, List } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Button title="sair" onPress={signOut}/>
    </Container>
  );
}

export default Dashboard;
