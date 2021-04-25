import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input';

const OrderItemList = ({ item, orderType }) => {
    const [available, setAvailable] = useState(true)
    const [quantity, setQuantity] = useState(item.quantity.toString())

    const checkQuantity = (text) => {
        if (parseInt(text) <= item.quantity && parseInt(text) > 0 || text==='') {
            setQuantity(text)
        }
    }

    return (
        <View>
            <Text style={styles.itemName} >{item.itemName}</Text>
            <View style={styles.itemContainer}>
                {orderType === 'pending' ? <TextInput 
                    keyboardType="number-pad" 
                    style={{...inputStyles.input, width: 35}} 
                    onChangeText={checkQuantity} 
                    value={quantity.toString()} 
                /> : <Text style={styles.itemName} >{quantity}</Text> }
                {orderType === 'pending' && <Switch
                    trackColor={{ true: colors.primary, false: colors.opaque }}
                    thumbColor={"#f4f3f4"}
                    onValueChange={() => {
                        setAvailable(!available)
                    }}
                    value={available}
                />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    }
})

export default OrderItemList