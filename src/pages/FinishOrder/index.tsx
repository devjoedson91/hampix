import React from 'react';
import { Container, Alert, Title, TextButton, Button } from './styles';

import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { StackParamsList } from '../../routes/app.routes';

import { api } from '../../services/api';

type RouteDetailParams = {

    FinishOrder: {
        number: string | number;
        order_id: string;
    }

}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder() {

    const route = useRoute<FinishOrderRouteProp>();
    const natigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinish() {

        try {

            await api.put('/order/send', {

                order_id: route.params?.order_id

            });

            natigation.popToTop(); // volta la pro inicio (primeira tela)

        } catch(err) {

            console.log('Erro ao finalizar: ', err);
        }

    }

    return (

        <Container>
            <Alert>Voce deseja finalizar esse pedido?</Alert>
            <Title>Mesa {route.params?.number}</Title>

            <Button onPress={handleFinish}>
                <TextButton>Finalizar Pedido</TextButton>
                <Feather name='shopping-cart' size={20} color='#1d1d2e'/>
            </Button>
        </Container>

    );

}