import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomePage from '../components/home/HomePage';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <HomePage navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default HomeScreen;