import React, { useState } from 'react'
import { Button, TextInput, View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../database/firebase'
import { useLinkProps } from '@react-navigation/native';

const CreateUserScreen = (props) => {

    //FANCY ALEERTS
    const [visible, setVisible] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
      setVisible(!visible);
    }, [visible]);


    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]:value})
    }

    const saveNewUser = async () => {
        if(state.name === '' ) {
            alert('Please provide name.')
        }else{
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone
            })
            props.navigation.navigate('UserList');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                  style={styles.inputText} 
                  placeholder="NAME USER" 
                  onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                  style={styles.inputText} 
                  placeholder="EMAIL USER"
                  onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                  style={styles.inputText} 
                  placeholder="PHONE USER"
                  onChangeText={(value) => handleChangeText('phone', value)}
                />
            </View>
            <View>
                <Button 
                style={styles.buttonLogin}
                title="Save"
                onPress={() => saveNewUser()}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },

    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },

    buttonLogin: {
    },

    inputText: {
      fontWeight: 'bold',
      fontFamily: 'monospace'
    }
  });
  

export default CreateUserScreen