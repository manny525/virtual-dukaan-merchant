import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions, TextInput } from 'react-native';
import Card from '../Card'
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input';
import { updateRequest } from '../../store/actions/serviceRequest';
import { useDispatch, useSelector } from 'react-redux';
import updateServiceStatus from '../../apiCalls/updateServiceStatus'
import inputStyles from '../../styles/input';
import getPaid from '../../apiCalls/getPaid'

const OrderItem = ({ order, setTab }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [time, setTime] = useState('');
    const [vCode, setVCode] = useState();
    const [received, setReceived] = useState(false)
    const [paying, setPaying] = useState(false)

    const token = useSelector(state => state.user.user.token)

    const dispatch = useDispatch()

    const orderStatusChange = async () => {
        let status
        if (order.status === 'new') {
            status = 'upcoming'
        }
        else if (order.status === 'completed') {
            status = 'paymentdone'
            const body = await JSON.stringify({ otp: vCode })
            setPaying(true)
            const paymentInfo = await getPaid(body, token)
            console.log(paymentInfo)
            if (paymentInfo.error) {
                setPaying(false)
                return
            } else if (paymentInfo.success) {
                setReceived(true)
            }
        }
        const body = await JSON.stringify({
            _id: order._id,
            status,
            time
        })
        const updatedService = await updateServiceStatus(body, token)
        dispatch(updateRequest(updatedService))
        setOrderModalVisible(false)
        if (status === 'upcoming') {
            setTab(1)
        }
        else if (status === 'paymentdone') {
            setTab(4)
        }
        setPaying(false)
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.customerName}</Text>
                        <Text style={styles.text} >{order.date}</Text>
                        {order.status === 'upcoming' &&
                            <Text style={styles.text} >{order.time}</Text>}
                    </View>
                    <MainButton style={{ width: 95 }} onPress={() => setOrderModalVisible(true)} >Check</MainButton>
                </View>
            </Card>
            <Modal
                animationType="slide"
                visible={orderModalVisible}
                onRequestClose={() => {
                    setOrderModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setOrderModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{order.customerName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={styles.itemName} >Date: {order.date}</Text>
                    {order.status === 'new' ?
                        <TextInput
                            style={inputStyles.input}
                            placeholder='Time: hh/mm AM/PM'
                            onChangeText={setTime}
                            value={time}
                        />
                        :
                        <Text style={{ ...styles.itemName }} >Time: {order.time}</Text>
                    }
                    <TextInput
                        editable={false}
                        multiline={true}
                        style={{ ...inputStyle.input, height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width * 0.8 }}
                        placeholder='Description'
                        selection={{ start: 0, end: 0 }}
                        value={order.description}
                    />
                    {order.status === 'paymentdone' &&
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 25 }} >
                            Payment Received
                            </Text>}
                    {order.status === 'completed' &&
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 16 }} >
                            Ask the customer for the Payment OTP
                            </Text>}
                    {order.status === 'completed' &&
                        <TextInput
                            style={inputStyle.input}
                            placeholder="Verification Code"
                            onChangeText={setVCode}
                            maxLength={6}
                        />}
                    {order.status !== 'upcoming' && order.status !== 'paymentdone' &&
                        <MainButton style={{ marginTop: 5 }} onPress={orderStatusChange}>
                            {order.status === 'new' ? 'Accept' : 'Get Paid'}
                        </MainButton>}
                    {paying && <Image source={require('../../../assets/load.gif')} />}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    },
    header2: {
        width: Dimensions.get('window').width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    },
    modalHeader: {
        alignItems: 'center'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default OrderItem