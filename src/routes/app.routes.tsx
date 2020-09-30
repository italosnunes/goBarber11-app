import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: '#ddd',
        headerStyle: { backgroundColor: '#312e38' },
      }}
    >
      <HomeStack.Screen
        name="Idealizesoft"
        component={Dashboard}
        options={{
          headerTitle: 'Idealizesoft',
          headerTitleAlign: 'center',
        }}
      />

    </HomeStack.Navigator>
  );
}

const AppRoutes:React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home';
        } else if (route.name === 'Perfil') {
          iconName = focused ? 'ios-person' : 'ios-person';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#232129',
      },
    }}
  >
    <Tab.Screen name="Home" component={HomeStackScreen} />
    <Tab.Screen name="Perfil" component={Profile} />
  </Tab.Navigator>
);

export default AppRoutes;

/*
<App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Event" component={Event} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="EventDetail" component={EventDetail} />
  </App.Navigator>

*/

/*





*/
