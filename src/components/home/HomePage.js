import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import MainButton from '../MainButton';
import { useSelector } from 'react-redux';
import Header from '../Header';
import PendingOrders from '../order/PendingOrders';
import AsyncStorage from '@react-native-community/async-storage';
import orderTypeSelector from '../selectors/orderTypeSelector';
import colors from '../../constants/colors';

const HomePage = ({ navigation }) => {
    const userData = useSelector(state => state.user.user)
    const token = userData.token
    const user = userData.user

    const orders = useSelector(state => state.orders.orders)
    const [upcomingOrders] = useState(orderTypeSelector(orders, 'pending'))
    const [readyOrders] = useState(orderTypeSelector(orders, 'ready'))

    const requests = useSelector(state => state.serviceRequest.requests)
    const [newRequests] = useState(orderTypeSelector(requests, 'new'))
    const [upcomingRequests] = useState(orderTypeSelector(requests, 'upcoming'))


    console.log(newRequests)

    const onLogout = () => {
        AsyncStorage.clear()
        BackHandler.exitApp()
    }

    return (
        <View>
            {/* <Header title='HOME' /> */}
            <View style={styles.container} >
                <View style={styles.textContainer} >
                    <Text style={styles.text} >
                        {user.typeOfMerchant === 'goods' ?
                            `Pending Orders: ${upcomingOrders.length}` :
                            `New Requests: ${newRequests.length}`}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        if (user.typeOfMerchant === 'goods')
                            navigation.jumpTo('Orders')
                        else
                            navigation.jumpTo('Requests')
                    }} >
                        <Text style={styles.touchText} >
                            See more {'>>'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer} >
                    <Text style={styles.text} >
                        {user.typeOfMerchant === 'goods' ?
                            `Upcoming Pick-ups: ${readyOrders.length}` :
                            `Upcoming Visits: ${upcomingRequests.length}`}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        if (user.typeOfMerchant === 'goods')
                            navigation.jumpTo('Orders')
                        else
                            navigation.jumpTo('Requests')
                    }} >
                        <Text style={styles.touchText} >
                            See more {'>>'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <MainButton onPress={onLogout} >Logout</MainButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 20,
        shadowOpacity: 0.26,
        backgroundColor: colors.opaque,
        marginVertical: 10,
        padding: Dimensions.get('window').width * 0.04,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 25
    },
    touchText: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: colors.primary
    }
})

export default HomePage