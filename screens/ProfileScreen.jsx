import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ProfileScreen = ({ navigation, route }) => {

    console.log(route.params)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ProfileScreen</Text>
            <Text
                style={styles.debug}>AuthToken: {route.params.authToken ? route.params.authToken : 'No token set'}</Text>
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
        backgroundColor: '#ffffff',
    },
})

export default ProfileScreen