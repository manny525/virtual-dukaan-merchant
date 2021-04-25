import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Keyboard, TouchableWithoutFeedback } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import createAlias from '../../apiCalls/createAlias';

const GeneralSignUp = (props) => {
    const [merchantName, setMerchantName] = useState('')
    const [merchantType, setMerchantType] = useState('')
    const [merchantPAN, setMerchantPAN] = useState('')
    const [referral, setReferral] = useState('')
    const [error, setError] = useState('')

    const onNext = () => {
        console.log(merchantPAN)
        if (merchantName && merchantType && merchantPAN) {
            props.onNext({
                merchantName,
                merchantType,
                merchantPAN
            })
        }
        else {
            setError('*Please enter all the details')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.formContainer}>
                {!!error && <Text>{error}</Text>}
                <Text>Card Details to accept payments</Text>
                <TextInput
                    style={inputStyle.input}
                    placeholder='Name on Card'
                    onChangeText={setMerchantName}
                    value={merchantName}
                />
                <TextInput
                    style={inputStyle.input}
                    placeholder='Card Number'
                    onChangeText={setMerchantPAN}
                    keyboardType='number-pad'
                    value={merchantPAN}
                    maxLength={16}
                />
                <Text>Merchant Type</Text>
                <Picker
                    style={styles.onePicker} itemStyle={styles.onePickerItem}
                    mode='dropdown'
                    selectedValue={merchantType}
                    onValueChange={(itemValue, itemIndex) => setMerchantType(itemValue)}
                >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Goods Provider" value="goods" />
                    <Picker.Item label="Service Provider" value="service" />
                </Picker>
                <TextInput
                    style={inputStyle.input}
                    placeholder='Customer Referral: Optional'
                    onChangeText={(text) => { setReferral(text) }}
                    value={referral}
                />
                <MainButton onPress={onNext} >Next</MainButton>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    dropdown: {
        paddingHorizontal: Dimensions.get('window').width / 4
    },
    picker: {
    },
    onePicker: {
        height: 30,
        width: Dimensions.get('window').width * 0.5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: colors.opaque
    },
    onePickerItem: {
        height: 44,
        color: 'red'
    },
    typeContainer: {
        flexDirection: 'row'
    },
    panContiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30
    },
    tinyLogo: {
        marginTop: 5,
        marginLeft: 10,
        height: 20,
        width: 20
    }
})

export default GeneralSignUp