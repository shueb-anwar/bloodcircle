/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useColorScheme
} from 'react-native';
import { Messages } from './Messages';
import ProfilePage from './ProfilePage';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { Avatar, Button, Card, Icon, lightColors } from '@rneui/themed';

const Drawer = createDrawerNavigator();

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={
        isDarkMode
          ? {
              headerTintColor: lightColors.white
            }
          : {}
      }
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              type="material-community"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Messages"
        component={Messages}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'inbox' : 'inbox-outline'}
              type="material-community"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'account' : 'account-outline'}
              type="material-community"
              color={color}
              size={size}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
};

const MainScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView>
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

function CustomDrawerContent(props) {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <View style={styles.avatarContainer}>
        <Avatar
          size={100}
          rounded
          // icon={{ name: 'account', type: 'material-community' }}
          title="SA"
          containerStyle={{
            marginVertical: 15,
            backgroundColor: isDarkMode
              ? lightColors.secondary
              : lightColors.primary
          }}
        />
        <Text style={styles.name}>Shuaib Anwar</Text>
        <Text>shueb.anwar@gmail.com</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ color, focused, size }) => (
            <Icon
              name="logout"
              type="material-community"
              color={color}
              size={size}
            />
          )}
          label="Logout"
          onPress={() =>
            props.navigation.navigate('LoginScreen', {
              screen: 'PhoneScreen',
              name: 'Jane'
            })
          }
        />
      </DrawerContentScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    flexDirection: 'row'
  },
  col: { flex: 1 }
});

export default Home;
