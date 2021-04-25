import React from 'react';
import { View, StyleSheet } from 'react-native';
import InventoryHome from '../components/inventory/InventoryHome';

const InventoryScreen = () => {
    return (
        <View style={styles.screen}>
            <InventoryHome />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default InventoryScreen;