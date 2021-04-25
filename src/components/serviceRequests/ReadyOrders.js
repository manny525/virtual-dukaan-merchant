import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from './OrderItem'
import orderTypeSelector from '../selectors/orderTypeSelector';

const ReadyOrders = ({ setTab }) => {
    const orders = useSelector(state => state.serviceRequest.requests)
    
    const [readyOrders] = useState(orderTypeSelector(orders, 'upcoming'))

    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={readyOrders}
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

export default ReadyOrders