import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as Linking from 'expo-linking'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
// Screens
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoginScreen from './screens/LoginScreen'


const prefix = Linking.createURL('/')
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export default function App() {

    // States
    const [ data, setData ] = useState(null)
    const [ useTabNavigation, setUseTabNavigation ] = useState(true)
    const toggleSwitch = () => setUseTabNavigation(previousState => !previousState)

    // Linking
    const linking = {
        prefixes: [ prefix ],
        config: {
            screens: {
                Home: 'home',
                Profile: 'profile',
                Settings: 'settings',
                Login: 'login',
            },
        },
    }

    // Actions
    const _handleOpenURL = (event) => {
        console.log(Linking.parse(event.url))
    }

    // Hooks
    useEffect(() => {
        const getInitialURL = async () => {
            const initialURL = await Linking.getInitialURL()
            if (initialURL) setData(Linking.parse(initialURL))
        }

        if (!data) {
            getInitialURL()
        }

        const linkSubscribe = Linking.addEventListener('url', _handleOpenURL)
        return () => {
            linkSubscribe.remove()
        }
    }, [])

    useLayoutEffect(() => {
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.info('Initial url is: ' + url)
            }
        })
    }, [])

    // Render
    return (
        <NavigationContainer linking={linking}>
            <StatusBar style="auto"/>
            {useTabNavigation ? (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen}/>
                    <Tab.Screen name="Settings" component={SettingsScreen}/>
                    <Tab.Screen name="Profile" component={ProfileScreen}/>
                    <Tab.Screen name="Login" component={LoginScreen}/>
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="Settings" component={SettingsScreen}/>
                    <Stack.Screen name="Profile" component={ProfileScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                </Stack.Navigator>
            )}

            <View style={styles.debug}>
            <Text style={{marginBottom: 12}}>Switch navigation type: {useTabNavigation? 'TabNavigator': 'StackNavigator'}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={useTabNavigation ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={useTabNavigation}
                />
            </View>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    debug: {
        padding: 24,
        paddingTop: 12,
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 1,    },
})
