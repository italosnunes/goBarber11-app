import React, { useState } from 'react';

import { Container, Header, Title, List } from './styles';

import EventItemList from '../../components/EventItemList';

export default function Dashboard() {
  const [events, setEvents] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
  ]);

  return (
    <Container>
      <List
        data={events}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => <EventItemList data={item} />}
      />
    </Container>
  );
}
