import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import MainButton from '../MainButton';
import inputStyle from '../../styles/input';

const EnterVerificationCode = (props) => {
    const [vCode, setVCode] = useState('')
    const validateCode = () => {
        if (vCode === props.vCode) {
            props.onVerify(3, props.email)
        }
        else {
            Alert.alert('Wrong', 'Enter the correct verification code', [{ text: 'Ok', style: 'cancel' }])
        }
    }
    const onCancel = () => {
        props.onVerify(1)
    }
    return (
        <View style={styles.screen}>
            <TextInput
                style={inputStyle.input}
                placeholder='Verification Code'
                keyboardType='number-pad'
                onChangeText={(text) => { setVCode(text) }}
                value={vCode}
                maxLength={6}
            />
            <MainButton style={{ marginVertical: 5, paddingVertical: 8 }} onPress={validateCode}>Verify</MainButton>
            <MainButton style={{ paddingVertical: 8 }} onPress={onCancel}>Cancel</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }
})

export default EnterVerificationCode