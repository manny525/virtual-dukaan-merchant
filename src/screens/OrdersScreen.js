import React from 'react';
import { View, StyleSheet } from 'react-native';
import OrderHome from '../components/order/OrderHome';

const OrdersScreen = () => {
    return (
        <View style={styles.screen}>
            <OrderHome />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default OrdersScreen