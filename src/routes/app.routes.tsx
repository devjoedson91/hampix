// rotas para usuarios logados

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // estilo de navegação stack

import Dashboard from '../pages/Dashboard';

const Stack = createNativeStackNavigator();

function AppRoutes() {

    return (

        <Stack.Navigator>

                <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }}/>

        </Stack.Navigator>

    );
}

export default AppRoutes;