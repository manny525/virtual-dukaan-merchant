import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import colors from '../constants/colors'
import TitleText from './TitleText';

const Header = (props) => {
    return (
        <View style={styles.header1}>
            <View style={styles.header2}>
                <TitleText>{props.title}</TitleText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header1: {
        width: Dimensions.get('window').width,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary
    },
    header2: {
        width: Dimensions.get('window').width,
        marginTop: 30,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    }
})

export default Header