import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import GetVerificationCodeForm from '../components/authForm/GetVerificationCodeForm';
import SignUpForm from '../components/authForm/SignUpForm';
import EnterVerificationCode from '../components/authForm/EnterVerificationCode';
import Header from '../components/Header';
import { setUser } from '../store/actions/user';
import { useDispatch } from 'react-redux';
import { setInventory } from '../store/actions/inventory';
import { setOrders } from '../store/actions/orders';
import AsyncStorage from '@react-native-community/async-storage';
import { setRequests } from '../store/actions/serviceRequest';
import findUser from '../apiCalls/findUser';

const AuthScreen = (props) => {
    const [existingUser, setExistingUser] = useState(props.userData)
    const [userLoaded, setUserLoaded] = useState(true)

    const checkExistingUser = async (email) => {
        const body = await JSON.stringify({
            email
        })
        const user = await findUser(body)
        return user
    }

    const changeVerificationStage = async (number, email = '', vCode = '') => {
        if (number === 1) {
            setVerificationStage(<GetVerificationCodeForm onVerify={changeVerificationStage} />)
        }
        else if (number === 2) {
            setVerificationStage(<EnterVerificationCode vCode={vCode} email={email} onVerify={changeVerificationStage} />)
        }
        else if (number === 3) {
            if (!existingUser) {
                const userData = await checkExistingUser(email)
                if (userData.existingUser) {
                    if (userData.user.typeOfMerchant === "goods") {
                        setExistingUser({
                            token: userData.token,
                            user: userData.user,
                            inventory: userData.inventory,
                            orders: userData.orders
                        })
                    } else if (userData.user.typeOfMerchant === "service") {
                        console.log(userData.services)
                        setExistingUser({
                            token: userData.token,
                            user: userData.user,
                            requests: userData.services
                        })
                    }
                }
                else {
                    setVerificationStage(<SignUpForm email={email} setLogin={props.setLogin} />)
                }
            }
        }
    }

    const [verificationStage, setVerificationStage] = useState(<GetVerificationCodeForm onVerify={changeVerificationStage} />)

    const dispatch = useDispatch()

    useEffect(() => {
        async function login() {
            if (existingUser) {
                await dispatch(setUser({ user: existingUser.user, token: existingUser.token }))
                if (existingUser.inventory) {
                    await dispatch(setInventory(existingUser.inventory))
                }
                if (existingUser.orders) {
                    await dispatch(setOrders(existingUser.orders))
                }
                props.setLogin(true, existingUser)
            }
        }
        login()
    }, [existingUser])

    useEffect(() => {
        async function login() {
            if (existingUser) {
                await dispatch(setUser({ user: existingUser.user, token: existingUser.token }))
                if (existingUser.inventory) {
                    await dispatch(setInventory(existingUser.inventory))
                }
                if (existingUser.orders) {
                    await dispatch(setOrders(existingUser.orders))
                }
                if (existingUser.requests) {
                    console.log(existingUser.requests)
                    await dispatch(setRequests(existingUser.requests))
                }
                props.setLogin(true, existingUser)
            }
        }
        login()
    }, [])

    useEffect(() => {
        async function setToken() {
            try {
                await AsyncStorage.setItem('token', existingUser.token);
                await AsyncStorage.setItem('owner', existingUser.user._id);
            } catch (error) {
                console.log(error)
            }
        }
        if (existingUser)
            setToken()
    }, [existingUser])

    return (
        <SafeAreaView style={styles.screen} >
            {verificationStage}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default AuthScreen