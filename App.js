import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNavigator, createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

//SCREEN COMPONENTS
import UsersList from './screens/UsersList'
import CreateUserScreen from './screens/CreateUseScreen'
import UserDetailScreen from './screens/UserDetailScreen'

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UsersList}/>
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
