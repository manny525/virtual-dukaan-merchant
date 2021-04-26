import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Keyboard, Button, Image } from 'react-native';
import inputStyles from '../../styles/input';
import MainButton from '../MainButton';
import validator from 'validator';
import getVerificationCode from '../../apiCalls/getVerificationCode';

const GetVerificationCodeForm = (props) => {
    const [emailText, setEmailText] = useState('')
    const [errorText, setErrorText] = useState('')

    const validateEmail = async () => {
        if (validator.isEmail(emailText)) {
            setErrorText('')
            Keyboard.dismiss()
            const body = await JSON.stringify({ email: emailText })
            const vCode = await getVerificationCode(body)
            console.log(vCode);
            props.onVerify(2, emailText, vCode.toString())
        }
        else {
            setErrorText('*Enter valid email id')
        }
    }
    return (
        <View style={styles.formContainer}>
            <Text>{errorText}</Text>
            <TextInput
                style={inputStyles.input}
                placeholder='Email Id'
                onChangeText={(text) => { setEmailText(text) }}
                value={emailText}
                keyboardType='email-address'
            />
            <MainButton onPress={validateEmail}>Verify</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 0,
        alignItems: 'center'
    }
})

export default GetVerificationCodeForm