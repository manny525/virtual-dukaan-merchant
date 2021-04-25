import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 30,
        width: Dimensions.get('window').width / 2,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    }
})

export default styles