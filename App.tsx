/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import HomeScreen from './Home';
import { Message } from './Home/Messages';
import RequestBlood from './Home/RequestBlood';
import RequestBloodConfirmation from './Home/RequestBloodConfirmation';
import LoginScreen from './LoginScreen';
import ProfileScreen from './Profile';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  lightColors,
  darkColors,
  createTheme,
  ThemeProvider
} from '@rneui/themed';

const Colors = {
  theme: '#d42029',
  primary: '#1292B4',
  secondary: '#6b6b6b',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
  black: '#000'
};

const Stack = createNativeStackNavigator();

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios
    }),
    ...{
      primary: Colors.theme
    }
  },
  components: {
    Button: {
      titleStyle: {
        fontWeight: 'normal',
        textTransform: 'uppercase'
      },
      buttonStyle: {
        height: 45
      }
    },
    Input: {
      inputStyle: {
        borderColor: 'red'
      },
      inputContainerStyle: {
        borderWidth: 1,
        paddingHorizontal: 10,
        height: 45
      },
      labelStyle: {
        fontWeight: 'normal',
        marginBottom: 4
      }
    }
  },
  mode: 'light'
});

const darkTheme = createTheme({
  darkColors: {
    ...Platform.select({
      default: darkColors.platform.android,
      ios: darkColors.platform.ios
    })
  },
  components: {
    Card: {
      containerStyle: {
        backgroundColor: darkColors.grey5
      }
    },
    Button: {
      titleStyle: {
        fontWeight: 'normal',
        textTransform: 'uppercase'
      },
      buttonStyle: {
        height: 45
      }
    },
    Input: {
      inputStyle: {
        borderColor: 'red'
      },
      inputContainerStyle: {
        borderWidth: 1,
        paddingHorizontal: 10,
        height: 45
      },
      labelStyle: {
        fontWeight: 'normal',
        marginBottom: 4
      }
    }
  },
  mode: 'dark'
});

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
    primary: Colors.theme //'rgb(255, 45, 85)'
  }
};

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)'
  }
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <NavigationContainer theme={isDarkMode ? MyDarkTheme : MyLightTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ title: 'Enter Contact Number', headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome', headerShown: false }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Message" component={Message} />
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

export default App;
