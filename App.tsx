/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense, useState, startTransition } from 'react';
import { Alert, StyleSheet, useColorScheme, View, Text } from 'react-native';
import HomeScreen from './Home';
import { Message, Messages } from './Messages';
import ProfileScreen from './Profile';
import DisplayNameScreen from './Profile/DisplayNameScreen';
import EmailScreen from './Profile/EmailScreen';
import BloodGroupScreen from './Profile/BloodGroupScreen';
import DocumentScreen from './Profile/DocumentScreen';
import DobScreen from './Profile/DobScreen';
import AddressScreen from './Profile/AddressScreen';
import RequestBlood from './Home/RequestBlood';
import RequestBloodConfirmation from './Home/RequestBloodConfirmation';
import LoginScreen from './LoginScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerScreenProps
} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Avatar,
  Icon,
  lightColors,
  ThemeProvider
} from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import { lightTheme, darkTheme } from './Theme'
import Colors from './Theme/Colors'

type RootStackParamList = {
  LoginScreen: undefined;
  Main: undefined;
  Home: undefined;
  RequestBlood: undefined;
  RequestBloodConfirmation: undefined;
  Profile: undefined;
  DisplayNameScreen: undefined;
  EmailScreen: undefined;
  BloodGroupScreen: { bloodGroup: string | undefined };
  DobScreen: { dob: string | undefined };
  AddressScreen: { address: string };
  DocumentScreen: { document: string | undefined };
  Messages: undefined;
  Message: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

// const CustomDarkTheme = {
//   ...DarkTheme,
//   colors: {
//     primary: 'rgb(255, 45, 85)',
//     background: 'rgb(242, 242, 242)',
//     card: 'rgb(255, 255, 255)',
//     text: 'rgb(28, 28, 30)',
//     border: 'rgb(199, 199, 204)',
//     notification: 'rgb(255, 69, 58)'
//   }
// };

const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.theme
  }
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)'
  }
};

const Drawer = createDrawerNavigator<RootStackParamList>();
const DrawerScreens = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={
        isDarkMode
          ? {
            headerTintColor: lightColors.white
          }
          : {}
      }
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
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
        component={ProfileScreen}
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

function CustomDrawerContent(props: any) {
  const isDarkMode = useColorScheme() === 'dark';
  const user = auth().currentUser;

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
        <Text style={styles.name}>{user?.displayName ?? user?.phoneNumber}</Text>
        {user?.email && <Text>{user.email}</Text>}
        <Text>{user?.phoneNumber}</Text>
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
          onPress={() => {
            Alert.alert('Signup', 'Do you want to signout?', [
              { text: 'Cancel', style: 'cancel', },
              { text: 'OK', onPress: () => auth().signOut() },
            ]);
          }}
        />
      </DrawerContentScrollView>
    </>
  );
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState(auth().currentUser);

  auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  if (!user) {
    return (
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDarkMode ? MyDarkTheme : MyLightTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: 'Enter Contact Number', headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDarkMode ? MyDarkTheme : MyLightTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={DrawerScreens}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="DisplayNameScreen" component={DisplayNameScreen} />
          <Stack.Screen name="EmailScreen" component={EmailScreen} />
          <Stack.Screen name="BloodGroupScreen" component={BloodGroupScreen} />
          <Stack.Screen name="DocumentScreen" component={DocumentScreen} />
          <Stack.Screen name="DobScreen" component={DobScreen} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} />
          <Stack.Screen name="RequestBlood" component={RequestBlood} />
          <Stack.Screen
            name="RequestBloodConfirmation"
            component={RequestBloodConfirmation}
            options={{ title: 'Confirmation' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );

};

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
  }
});

export default App;
