import { lightColors, darkColors, createTheme } from '@rneui/themed';
import Colors from './Colors'

export const lightTheme = createTheme({
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
        Card: {
            containerStyle: {
                marginHorizontal: 0
            }
        },
        Button: {
            titleStyle: {
                fontWeight: 'normal',
                textTransform: 'uppercase'
            },
            buttonStyle: {
                height: 45
            },
            disabledStyle: {
                
            }
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0,
            },
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

export const darkTheme = createTheme({
    darkColors: {
        ...Platform.select({
            default: darkColors.platform.android,
            ios: darkColors.platform.ios
        })
    },
    components: {
        Card: {
            containerStyle: {
                backgroundColor: darkColors.grey5,
                marginHorizontal: 0
            }
        },
        Button: {
            titleStyle: {
                fontWeight: 'normal',
                textTransform: 'uppercase'
            },
            buttonStyle: {
                height: 45
            },
            disabledStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.4)'
            }
        },
        Input: {
            containerStyle: {
                paddingHorizontal: 0,
            },
            inputStyle: {
                borderColor: 'red',
                marginHorizontal: 0,
                paddingHorizontal: 0,
            },
            inputContainerStyle: {
                borderWidth: 1,
                paddingHorizontal: 10,
                height: 45,
            },
            labelStyle: {
                fontWeight: 'normal',
                marginBottom: 4
            }
        },
        CheckBox: {
            containerStyle: {
                marginHorizontal: 50
            },
            textStyle: {
                color: darkColors.grey5
            }
        }
    },
    mode: 'dark'
});