import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

const LoginScreen = ({ navigation }) => {

    // Configurations
    let loginUrl = 'https://expo-deep-link.surge.sh/login.html'

    // States
    const [ result, setResult ] = useState(null)
    const [ linkingUrl, setLinkingUrl ] = useState(loginUrl)

    // Actions
    const _login = async () => {
        try {
            const result = await WebBrowser.openAuthSessionAsync(linkingUrl, Linking.createURL('profile'))
            let redirectData

            if (result?.url) {
                redirectData = Linking.parse(result.url)
                let authToken = redirectData.queryParams.authToken
                setResult(redirectData)
                if (authToken) {
                    if (Platform.OS === 'ios') {
                        navigation.navigate('Profile', { authToken })
                    }
                    /*
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes: [{ name: 'Home' }],
                        }),
                    )
                    navigation.navigate('Home')
                     */
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    const _logout = () => {
        setResult(null)
    }

    useLayoutEffect(() => {
        Linking.getInitialURL().then((url) => {
            if (url) {
                setLinkingUrl(`${loginUrl}?linkingUri=${encodeURI(url)}/--/profile`)
            }
        })
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>LoginScreen</Text>
            <Button title={'Login'} onPress={_login} style={styles.btnBlock}/>
            <Button title={'Logout'} onPress={_logout} style={styles.btnBlock}/>
            <Text style={styles.debug}>Result: {result ? JSON.stringify(result) : 'no data'}</Text>
            <Text style={styles.debug}>LinkingUrl: {linkingUrl}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    btnBlock: {
        margin: 10,
        width: '100%',
    },
    debug: {
        marginTop: 12,
        padding: 42,
        backgroundColor: '#ffffff',
    },
})

export default LoginScreen