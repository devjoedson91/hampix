import React, { useState,  } from "react";
import { Text, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"; // pegando os parametros da mesa aberta
import { Feather } from '@expo/vector-icons';

import { 
    OrderContainer, 
    Header, 
    Title, 
    InputCatogary, 
    InputProduct, 
    QtdContainer, 
    QtdText,
    QtdInput,
    ActionsContainer,
    ButtonAdd,
    ActionsText,
    ButtonGo
} from './styles';

import { api } from '../../services/api';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    async function handleCloseOrder() {

        try {

            await api.delete('/order', { params: { order_id: route.params?.order_id }})

            navigation.goBack();

        } catch(err) {

            console.log(err);
        }

    }

    return (

        <OrderContainer>
            <Header>
                <Title>Mesa {route.params.number}</Title>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name="trash-2" size={28} color='#ff3f4b' />
                </TouchableOpacity>
            </Header>

            <InputCatogary>
                <Text style={{color: '#fff'}}>Pizzas</Text>
            </InputCatogary>

            <InputProduct>
                <Text style={{color: '#fff'}}>Pizza de calabresa</Text>
            </InputProduct>

            <QtdContainer>
                <QtdText>Quantidade</QtdText>
                <QtdInput 
                    placeholderTextColor='#f0f0f0'
                    keyboardType='numeric'
                    value='1'
                />
            </QtdContainer>

            <ActionsContainer>
                <ButtonAdd>
                    <ActionsText>+</ActionsText>
                </ButtonAdd>
                <ButtonGo>
                    <ActionsText>Avançar</ActionsText>
                </ButtonGo>
            </ActionsContainer>
            
        </OrderContainer>

    );

}