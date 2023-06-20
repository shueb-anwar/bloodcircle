/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useColorScheme
} from 'react-native';

import { Button, Card, Icon, lightColors } from '@rneui/themed';

const MainScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title style={styles.userName}>John Doe</Card.Title>
        <Button
          color={isDarkMode ? 'secondary' : 'primary'}
          onPress={() => navigation.navigate('RequestBlood')}>
          Request for Blood{' '}
          <Icon name="plus" color="white" type="material-community" />
        </Button>
        <Card.Divider />
        <Text>Father Name: John doe</Text>
        <Text>Last Donated on: 21 July 2022</Text>
      </Card>
      <View style={styles.row}>
        <Card containerStyle={[styles.col]}>
          <Card.Title style={styles.title}>Total Unit(s)</Card.Title>
          <Text style={styles.units}>12</Text>
        </Card>
        <Card containerStyle={styles.col}>
          <Card.Title style={styles.title}>Current Unit(s)</Card.Title>
          <Text style={styles.units}>2</Text>
        </Card>
      </View>
      <View style={styles.row}>
        <Card containerStyle={[styles.col]}>
          <Card.Title style={styles.title}>Expired Unit(s)</Card.Title>
          <Text style={styles.units}>07</Text>
        </Card>
        <Card containerStyle={styles.col}>
          <Card.Title style={styles.title}>Reimbursed Unit(s)</Card.Title>
          <Text style={styles.units}>12</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  avatarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  },
  avatar: {
    backgroundColor: lightColors.secondary,
    marginVertical: 15
  },
  name: {
    fontSize: 20,
    textTransform: 'uppercase'
  },
  userName: {
    textAlign: 'left',
    fontSize: 36
  },
  title: {
    position: 'absolute',
    right: 0
  },
  units: {
    fontSize: 46,
    marginTop: 20
  },
  text: { fontSize: 42 },
  row: {
    flexDirection: 'row',
    gap: 15
  },
  col: { flex: 1 }
});

export default MainScreen;
