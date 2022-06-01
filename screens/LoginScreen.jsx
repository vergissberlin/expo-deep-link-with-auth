import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

const LoginScreen = ({ navigation }) => {

    // Configurations
    let loginUrl = 'https://expo-deep-link.surge.sh/login.html'

    // States
    const [ result, setResult ] = useState(null)
    const [ initialUrl, setInitialUrl ] = useState(null)
    const [ linkingUrl, setLinkingUrl ] = useState(Linking.createURL('profile'))


    // Actions
    const _login = async () => {
        try {
            const result = await WebBrowser.openAuthSessionAsync(loginUrl, linkingUrl)
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

    useLayoutEffect(() => {
        Linking.getInitialURL().then((url) => {
            if (url) {
                setInitialUrl(url)
                // setLinkingUrl(`${loginUrl}?linkingUri=${encodeURI(url)}`)
            }
        })
    }, [])


    return (
        <View style={styles.container}>
            <Text>LoginScreen</Text>
            <Button title={'Login'} onPress={_login}/>
            <Text style={{ paddingHorizontal: 42 }}>{result ? JSON.stringify(result) : 'no data'}</Text>
            <Text style={{ paddingHorizontal: 42 }}>{linkingUrl}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default LoginScreen