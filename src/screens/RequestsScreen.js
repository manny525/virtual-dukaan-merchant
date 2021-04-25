import React from 'react';
import { View, StyleSheet } from 'react-native';
import OrderHome from '../components/serviceRequests/RequestHome';

const RequestsScreen = ({ tab = 2 }) => {
    return (
        <View style={styles.screen}>
            <OrderHome defaultTab={tab} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default RequestsScreen