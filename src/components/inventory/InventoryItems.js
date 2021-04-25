import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Modal, Dimensions, Image, TextInput } from 'react-native';
import InventoryItem from './InventoryItem';
import TitleText from '../TitleText';
import colors from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import addItemInventory from '../../apiCalls/addItemInventory';
import { setInventory } from '../../store/actions/inventory';

const InventoryItems = ({ items, category }) => {
    const [addItemModalVisible, setAddItemModalVisible] = useState(false)
    const [itemName, setItemName] = useState('')
    const [available, setAvailable] = useState(true)
    const [sellingPrice, setSellingPrice] = useState('')

    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)

    const dispatch = useDispatch()

    const addItem = async () => {
        try {
            const inventory = await addItemInventory(JSON.stringify({
                item: {
                    itemName,
                    available,
                    sellingPrice,
                    categoryId: category._id,
                    owner
                }
            }), token)
            dispatch(setInventory(inventory))
            setItemName('')
            setSellingPrice('')
        } catch (e) {
            console.log(e)
        }
        setAddItemModalVisible(false)
    }

    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <InventoryItem item={item} categoryId={category._id} />
                    )
                }}
                keyExtractor={item => item._id}
            />
            <TouchableOpacity style={styles.addItem} onPress={() => setAddItemModalVisible(true)} >
                <Text>Add item</Text>
                <Text>+</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={addItemModalVisible}
                onRequestClose={() => {
                    setAddItemModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setAddItemModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>Category: {category.categoryName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={styles.itemName} >Item Name</Text>
                    <TextInput
                        style={{ ...inputStyle.input, marginTop: 2 }}
                        placeholder='Item Name'
                        onChangeText={(text) => { setItemName(text) }}
                        value={itemName}
                    />
                    <Text style={styles.itemName}>Selling Price</Text>
                    <TextInput
                        keyboardType='number-pad'
                        style={{ ...inputStyle.input, marginTop: 2 }}
                        placeholder='Item Name'
                        onChangeText={(text) => { setSellingPrice(text) }}
                        value={sellingPrice}
                    />
                    <Text style={styles.itemName}>Available</Text>
                    <Switch
                        trackColor={{ true: colors.primary, false: colors.opaque }}
                        thumbColor={"#f4f3f4"}
                        onValueChange={() => {
                            setAvailable(!available)
                        }}
                        value={available}
                    />
                    <MainButton style={{ marginTop: 5 }} onPress={addItem}>Add</MainButton>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        marginTop: 5,
        flex: 1,
        width: '80%',
        marginLeft: 30,
        alignItems: 'stretch'
    },
    addItem: {
        marginTop: 10,
        width: '50%',
        marginLeft: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header2: {
        width: Dimensions.get('window').width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    },
    modalHeader: {
        alignItems: 'center'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryItems