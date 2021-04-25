import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';

const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}}>
                <Text style={{...styles.buttonText, ...props.textStyle}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        width: '70%',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'open-sans',
        color: 'white',
        fontSize: 18
    }
})

export default MainButton