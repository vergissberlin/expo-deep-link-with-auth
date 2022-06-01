import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
            />
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
    debug: {
        padding: 42,
    },
})

export default HomeScreen