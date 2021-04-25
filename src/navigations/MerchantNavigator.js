import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InventoryScreen from '../screens/InventoryScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import colors from '../constants/colors';
import RequestsScreen from '../screens/RequestsScreen';

const Tab = createBottomTabNavigator()

const MerchantNavigator = ({ merchantType }) => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'ios-home'
                        } else if (route.name === 'Inventory') {
                            iconName = 'ios-menu';
                        } else if (route.name === 'Orders' || 'Requests') {
                            iconName = 'ios-paper';
                        }
                        return <Ionicons name={iconName} size={size} color={!focused ? colors.opaque : colors.primary} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colors.primary,
                    inactiveTintColor: colors.opaque,
                    activeBackgroundColor: colors.opaque,
                    inactiveBackgroundColor: colors.primary 
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                />
               {merchantType === 'goods' && <Tab.Screen
                    name="Inventory"
                    component={InventoryScreen}
                />}
                {merchantType === 'service' && <Tab.Screen
                    name="Requests"
                    component={RequestsScreen}
                />}
                {merchantType === 'goods' &&<Tab.Screen
                    name="Orders"
                    component={OrdersScreen}
                />}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MerchantNavigator