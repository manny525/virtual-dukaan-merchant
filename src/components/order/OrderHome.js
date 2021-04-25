import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PendingOrders from './PendingOrders';
import colors from '../../constants/colors';
import ReadyOrders from './ReadyOrders';
import CompletedOrders from './CompletedOrders';
import Header from '../Header';
import PaidOrders from './PaidOrders';
import updateOrders from '../../apiCalls/updateOrders';
import { setOrders } from '../../store/actions/orders';
import MainButton from '../MainButton';

const OrderHome = () => {
    const [tab, setTab] = useState(1);

    const token = useSelector(state => state.user.user.token);

    const orders = useSelector(state => state.orders.orders);

    const dispatch = useDispatch();

    const refresh = async () => {
        const updatedOrders = await updateOrders(token);
        dispatch(setOrders(updatedOrders));
        setTab(((tab) % 4 + 1));
    }

    return (
        <View style={styles.screen} >
            <TouchableOpacity style={styles.refreshView} onPress={refresh}>
                <Image source={require('../../../assets/refresh.png')} style={styles.tinyLogo} />
            </TouchableOpacity>
            <View style={styles.tabContainer} >
                <TouchableOpacity onPress={() => setTab(1)}>
                    {tab === 1 ? <Text style={styles.tabTextBold}>Pending</Text> : <Text style={styles.tabText}>Pending</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(2)}>
                    {tab === 2 ? <Text style={styles.tabTextBold}>Ready</Text> : <Text style={styles.tabText}>Ready</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(3)}>
                    {tab === 3 ? <Text style={styles.tabTextBold}>Completed</Text> : <Text style={styles.tabText}>Completed</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(4)}>
                    {tab === 4 ? <Text style={styles.tabTextBold}>Paid</Text> : <Text style={styles.tabText}>Paid</Text>}
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }} >
                {tab === 1 && <PendingOrders setTab={setTab} />}
                {tab === 2 && <ReadyOrders setTab={setTab} />}
                {tab === 3 && <CompletedOrders setTab={setTab} />}
                {tab === 4 && <PaidOrders setTab={setTab} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    tabContainer: {
        width: Dimensions.get('window').width,
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.primary
    },
    tabText: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: 'white'
    },
    tabTextBold: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'white'
    },
    tinyLogo: {
        height: 30,
        width: 35
    },
    refreshView: {
        alignItems: "center"
    }
})

export default OrderHome