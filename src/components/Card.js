import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import colors from '../constants/colors';

const Card = (props) => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 20,
        shadowOpacity: 0.26,
        backgroundColor: colors.opaque,
        padding: Dimensions.get('window').width * 0.04,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center'
    }
})

export default Card