import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text } from 'react-native'
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
    const [ initialUrl, setInitialUrl ] = useState(null)
    const [ data, setData ] = useState(null)


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
        setData(Linking.parse(event.url))
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
                setInitialUrl(url)
            }
        })
    }, [])

    // Render
    return (
        <NavigationContainer linking={linking}>
            <StatusBar style="auto"/>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Login" component={LoginScreen} />
          </Tab.Navigator>
            <Text style={styles.debug}>Initial url is: {initialUrl ? initialUrl : 'not set'}</Text>
            <Text style={styles.debug}>{data ? JSON.stringify(data) : 'No data'}</Text>
        </NavigationContainer>
    )
}

/*
         <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }}/>
                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }}/>
            </Stack.Navigator>
 */

/*
  <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    debug: {
        padding: 24,
    },
})
