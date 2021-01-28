import React, { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import firebase from "../database/firebase";

const UserDetailScreen = (props) => {

  const initialState = {
        id: "",
        name: "",
        email: "",
        phone: "",
  }

  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();

    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const deleteUser = async () => {
      const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
      await dbRef.delete();
      props.navigation.navigate('UserList')
  }

  const updateUser = async () => {
      const dbRef = firebase.db.collection('users').doc(user.id);
      await dbRef.set({
          name: user.name,
          email: user.email,
          phone: user.phone
      })

      setUser(initialState);
      props.navigation.navigate('UserList');
  }

  const openConfirmationAlert = () => {
    Alert.alert('Remove the user!', 'Are you sure?', [
        { text: 'Yes', onPress: () => deleteUser},
        { text: 'No', onPress: () => console.log('NO')},
    ])
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.inputText}
          placeholder="NAME USER"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.inputText}
          placeholder="EMAIL USER"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.inputText}
          placeholder="PHONE USER"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonUpdate}
          title="UPDATE USER"
          onPress={() => updateUser()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonDelete}
          title="DELETE USER"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

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
    borderBottomColor: "#cccccc",
  },

  buttonLogin: {},

  inputText: {
    fontWeight: "bold",
    fontFamily: "monospace",
  },

  buttonContainer: {
    margin: 5,
  },

  buttonUpdate: {},

  buttonDelete: {},
});

export default UserDetailScreen;
