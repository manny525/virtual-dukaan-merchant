import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, Text, Dimensions, Picker, KeyboardAvoidingViewBase } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import GeneralSignUp from './GeneralSignUp';
import GoodsProviderValidation from './GoodsProviderValidation';
import ServiceProviderValidation from './ServiceProviderValidation';


const SignUpForm = (props) => {

    const onNext = (data) => {
        if (data.merchantType === 'goods') {
            setDisplay(<GoodsProviderValidation data={{ ...data, email: props.email }} setLogin={props.setLogin} />)
        }
        else if (data.merchantType === 'service') {
            setDisplay(<ServiceProviderValidation data={{ ...data, email: props.email }} setLogin={props.setLogin} />)
        }
    }

    const [display, setDisplay] = useState(<GeneralSignUp onNext={onNext} />)

    return (
        <View style={styles.formContainer}>
            <Text>Merchant Registration</Text>
            { display }
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    }
})

export default SignUpForm