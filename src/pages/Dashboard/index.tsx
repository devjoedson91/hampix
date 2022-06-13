import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackParamsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AreaContainer, DashButton, AreaInput, Title, ButtonText } from './styles';

import { AuthContext } from '../../contexts/AuthContext';

import { api } from '../../services/api';

export default function Dashboard() {

    const { signOut } = useContext(AuthContext);

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState('');

    async function openOrder() {

        if (number === '') return;

        // fazer a requisição e abrir a mesa e navegar pra proxima tela

        const response = await api.post('/order', { table: Number(number) })

        navigation.navigate('Order', { number: number, order_id: response.data.id});

        setNumber('');

    }

    return (

        <AreaContainer>

            <Title>Novo Pedido</Title>
            <AreaInput 
                placeholder="Numero da mesa" 
                placeholderTextColor="#f0f0f0" 
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}
            />
            <DashButton onPress={openOrder}>
                <ButtonText>Abrir mesa</ButtonText>
            </DashButton>

        </AreaContainer>

    );

}