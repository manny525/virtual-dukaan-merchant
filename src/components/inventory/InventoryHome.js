import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Image, Modal } from 'react-native';
import colors from '../../constants/colors';
import InventoryList from './InventoryList';
import { useSelector, useDispatch } from 'react-redux';
import TitleText from '../TitleText';
import MainButton from '../MainButton';
import inputStyle from '../../styles/input'
import addCategoryInventory from '../../apiCalls/addCategoryInventory';
import { setInventory } from '../../store/actions/inventory';
import Header from '../Header';

const InventoryHome = () => {
    const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [error, setError] = useState('')

    const inventory = useSelector(state => state.inventory.inventory)
    const owner = useSelector(state => state.user.user.user._id)
    const token = useSelector(state => state.user.user.token)

    const dispatch = useDispatch()

    const addCategory = async () => {
        if (!categoryName || !owner || !token) {
            setError('*Please enter Category Name')
            return
        }
        const inventory = await addCategoryInventory(JSON.stringify({
            category: {
                categoryName,
                owner
            }
        }), token)
        dispatch(setInventory(inventory))
        setAddCategoryModalVisible(false)
        setCategoryName('')
    }

    return (
        <View style={styles.screen} >
            <TouchableOpacity style={styles.addItem} onPress={() => setAddCategoryModalVisible(true)} >
                <Text>Add Category</Text>
                <Text>+</Text>
            </TouchableOpacity>
            {inventory &&
                <FlatList
                    data={inventory.categories}
                    renderItem={({ item }) => {
                        return (
                            <InventoryList category={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />}
            <Modal
                animationType="slide"
                visible={addCategoryModalVisible}
                onRequestClose={() => {
                    setAddCategoryModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setAddCategoryModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogoArrow} />
                    </TouchableOpacity>
                    <TitleText>Add Category</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={styles.itemName} >Category Name</Text>
                    <TextInput
                        style={{ ...inputStyle.input, marginTop: 2 }}
                        placeholder='Category Name'
                        onChangeText={(text) => { setCategoryName(text) }}
                        value={categoryName}
                    />
                    <MainButton style={{ marginTop: 5 }} onPress={addCategory} >Add</MainButton>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.opaque,
        marginVertical: 2,
        width: Dimensions.get('window').width * 0.8
    },
    category: {
        fontSize: 30
    },
    tinyLogo: {
        marginTop: 5,
        marginRight: 5,
        height: 15,
        width: 15
    },
    addItem: {
        width: '50%',
        marginLeft: 100,
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
    tinyLogoArrow: {
        height: 40,
        width: 40
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryHome