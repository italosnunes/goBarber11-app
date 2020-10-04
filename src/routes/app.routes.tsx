import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import AppointmentCreated from '../pages/AppointmentCreated';
import CreateAppointment from '../pages/CreateAppointment';

const App = createStackNavigator();

const AppRoutes:React.FC = () => (

  <App.Navigator
  screenOptions={{
    headerShown:false,
    cardStyle: { backgroundColor: '#312e38' },
  }}
  >
    {/** Comentário  */}
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />
    <App.Screen name="Perfil" component={Profile} />


  </App.Navigator>

);

export default AppRoutes;

