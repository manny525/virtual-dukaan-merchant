import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem'
import orderTypeSelector from '../selectors/orderTypeSelector';

const PaidOrders = ({ setTab }) => {
    const orders = useSelector(state => state.serviceRequest.requests)

    const [paidOrders] = useState(orderTypeSelector(orders, 'paymentdone'))

    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={paidOrders}
                renderItem={({ item }) => {
                    return (
                        <OrderItem order={item} setTab={setTab} />
                    )
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        width: '80%'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    }
})

export default PaidOrders