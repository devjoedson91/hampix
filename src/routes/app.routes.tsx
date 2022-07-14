// rotas para usuarios logados

import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // estilo de navegação stack

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';

import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { AuthContext } from '../contexts/AuthContext';

export type StackParamsList = {

    Dashboard: undefined;
    Order: {
        number: number | string,
        isDelivery: boolean,
        order_id: string
    };
    FinishOrder: {
        number: number | string;
        isDelivery: boolean,
        order_id: string;
    };

}

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {

    const { signOut } = useContext(AuthContext);

    return (

        <Stack.Navigator>

                <Stack.Screen name='Dashboard' component={Dashboard} options={{
                    title: 'Sair',
                    headerStyle: {
                        backgroundColor: '#1d1d2e'
                    },
                    headerTintColor: '#fff',
                    headerLeft: () => (

                        <TouchableOpacity 
                            style={{marginRight: 12}}
                            onPress={signOut}
                        >
                            <Feather name="log-out" size={28} color='#ff3f4b' />
                        </TouchableOpacity>

                    )
                    
                }}/>
                <Stack.Screen name='Order' component={Order} options={{ headerShown: false }} />
                <Stack.Screen name='FinishOrder' component={FinishOrder} options={{
                    title: 'Finalizando',
                    headerStyle: {
                        backgroundColor: '#1d1d2e'
                    },
                    headerTintColor: '#fff'
                }}/>

        </Stack.Navigator>

    );
}

export default AppRoutes;