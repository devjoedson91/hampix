import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Modal } from 'react-native';
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

import { ModalPicker } from '../../components/ModalPicker';

type RouteDetailParams = {
    Order: {
        number: string | number;
        order_id: string;
    }
}

export type CategoryProps = {

    id: string;
    name: string;

}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]); // useState para armazenar as categorias

    const [categorySelected, setCategorySelected] = useState<CategoryProps>(); // useState pra guardar a selecionada

    const [amount, setAmount] = useState('1'); // guardando a qtd que o usuario informar

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false); // state para informar se o modal esta aberto ou fechado

    // buscando as categorias

    useEffect(() => {

        async function loadInfo() {

            const response = await api.get('/category')

            setCategory(response.data);
            setCategorySelected(response.data[0]);

        }

        loadInfo();

    }, []);

    async function handleCloseOrder() {

        try {

            await api.delete('/order', { params: { order_id: route.params?.order_id }})

            navigation.goBack();

        } catch(err) {

            console.log(err);
        }

    }

    function handleChangeCategory(item: CategoryProps) {

        setCategorySelected(item);

    }

    return (

        <OrderContainer>
            <Header>
                <Title>Mesa {route.params.number}</Title>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name="trash-2" size={28} color='#ff3f4b' />
                </TouchableOpacity>
            </Header>

            {category.length !== 0 && (

                <InputCatogary onPress={() => setModalCategoryVisible(true)}>
                <Text style={{color: '#fff'}}>
                    {categorySelected?.name}
                </Text>
                </InputCatogary>

            )}

            <InputProduct>
                <Text style={{color: '#fff'}}>Pizza de calabresa</Text>
            </InputProduct>

            <QtdContainer>
                <QtdText>Quantidade</QtdText>
                <QtdInput 
                    placeholderTextColor='#f0f0f0'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
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

            <Modal 
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            
        </OrderContainer>

    );

}