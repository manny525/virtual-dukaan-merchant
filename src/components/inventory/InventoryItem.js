import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import deleteItemInventory from '../../apiCalls/deleteItemInventory';
import { useSelector, useDispatch } from 'react-redux';
import { setInventory } from '../../store/actions/inventory';
import editItemInventory from '../../apiCalls/editItemInventory';
import addItemInventory from '../../apiCalls/addItemInventory';

const InventoryItem = ({ item, categoryId }) => {
    const [itemModalVisible, setItemModalVisible] = useState(false)
    const [itemName, setItemName] = useState(item.itemName)
    const [available, setAvailable] = useState(item.available)
    const [sellingPrice, setSellingPrice] = useState(item.sellingPrice)
    const [error, setError] = useState('')
    const [inventory, setUserInventory] = useState(null)

    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)

    const dispatch = useDispatch()

    const deleteItem = async () => {
        setUserInventory(await deleteItemInventory(JSON.stringify({
            item: {
                _id: item._id,
                categoryId,
                owner
            }
        }), token))
    }

    const editItem = async () => {
        if (!itemName || !sellingPrice) {
            return setError('*Please enter all the details')
        }
        try {
            setUserInventory(await editItemInventory(JSON.stringify({
                item: {
                    _id: item._id,
                    itemName,
                    available,
                    sellingPrice,
                    categoryId,
                    owner
                }
            }), token))
        } catch(e) {
            console.log(e)
        }
    }

    const editItemAvailability = async () => {
        setUserInventory(await editItemInventory(JSON.stringify({
            item: {
                _id: item._id,
                itemName,
                available: !available,
                sellingPrice,
                categoryId,
                owner
            }
        }), token))
    }

    const toggleAvailability = async () => {
        editItemAvailability()
    }

    useEffect(() => {
        if (inventory) {
            dispatch(setInventory(inventory))
            setItemModalVisible(false)
        }
    }, [inventory])

    return (
        <View style={styles.itemContainer} >
            <TouchableOpacity onPress={() => setItemModalVisible(true)} >
                <Text style={styles.itemName} >{item.itemName}</Text>
            </TouchableOpacity>
            <Switch
                trackColor={{ true: colors.primary, false: colors.opaque }}
                thumbColor={"#f4f3f4"}
                onValueChange={toggleAvailability}
                value={available}
            />
            <Modal
                animationType="slide"
                visible={itemModalVisible}
                onRequestClose={() => {
                    setItemModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setItemModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{item.itemName}</TitleText>
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
                        placeholder='Item Price'
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
                    <MainButton
                        style={{ backgroundColor: colors.secondary, marginTop: 5 }}
                        onPress={deleteItem}
                    >
                        Delete
                        </MainButton>
                    <MainButton style={{ marginTop: 5 }} onPress={editItem} >Edit</MainButton>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
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
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryItem