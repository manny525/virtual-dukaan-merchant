import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from './OrderItem'

const OrderItems = ({ orders }) => {
    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)

    const dispatch = useDispatch()

    return (
        <ScrollView style={styles.itemsContainer} > {/* to be shown as a tab */}
            <View>
                <Text style={styles.itemName}>Pending</Text>
                <FlatList
                    data={orders.pending}
                    renderItem={({ item }) => {
                        return (
                            <OrderItem order={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
            </View>
            <View>
                <Text style={styles.itemName}>Ready</Text>
                <FlatList
                    data={orders.ready}
                    renderItem={({ item }) => {
                        return (
                            <OrderItem order={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
            </View>
            <View>
                <Text style={styles.itemName}>Completed</Text>
                <FlatList
                    data={orders.completed}
                    renderItem={({ item }) => {
                        return (
                            <OrderItem order={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
            </View>
        </ScrollView>
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

export default OrderItems