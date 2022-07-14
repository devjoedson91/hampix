import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, Modal, FlatList } from 'react-native';
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

import { ListItem } from '../../components/ListItem';

import { NativeStackNavigationProp  } from "@react-navigation/native-stack"; 
import { StackParamsList } from '../../routes/app.routes';


type RouteDetailParams = {
    Order: {
        number: string | number;
        isDelivery: boolean;
        order_id: string;
    }
}

export type CategoryProps = {

    id: string;
    name: string;

}

type ProductProps = {

    id: string;
    name: string;

}

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    // criando os states para as categorias

    const [category, setCategory] = useState<CategoryProps[] | []>([]); // useState para armazenar as categorias

    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>(); // useState pra guardar a selecionada

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false); // state para informar se o modal esta aberto ou fechado

    // criando os states para os produtos

    const [products, setProducts] = useState<ProductProps[] | []>([]);

    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();

    const [modalProductVisible, setModalProductVisible] = useState(false);

    // criando os states dos itens

    const [amount, setAmount] = useState('1'); // guardando a qtd que o usuario informar

    const [items, setItems] = useState<ItemProps[]>([]);


    // buscando as categorias

    useEffect(() => {

        async function loadInfo() {

            const response = await api.get('/category')

            setCategory(response.data);
            setCategorySelected(response.data[0]);

        }

        loadInfo();

    }, []);

    // buscando os produtos de acordo com a categoria

    useEffect(() => {

        async function loadProducts() {

            const response = await api.get('/category/product', { 
                params: { category_id: categorySelected?.id}
            })

            setProducts(response.data);
            setProductSelected(response.data[0]);

        }

        loadProducts();

    }, [categorySelected]);

    async function handleCloseOrder() {

        try {

            await api.delete('/order', { 
                params: { 
                    order_id: route.params?.order_id 
                }
            })

            navigation.goBack();

        } catch(err) {

            console.log(err);
        }

    }

    function handleChangeCategory(item: CategoryProps) {

        setCategorySelected(item);

    }

    function handleChangeProduct(item: ProductProps) {

        setProductSelected(item);

    }

    // adicionando um item ao pedido

    async function handleAddItem() {

        const response = await api.post('/order/add', {

            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount)

        })

        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data]);

    }

    // excluindo item da order

    async function handleDeleteItem(item_id: string) {

        await api.delete('order/remove', {

            params: { item_id: item_id }

        });

        // apos remover da api, removemos esse item da lista

        let removeItem = items.filter(item => {

            return (item.id !== item_id);

        });

        setItems(removeItem);

    }

    function handleFinishOrder() {

        navigation.navigate('FinishOrder', {

            number: route.params?.number,
            isDelivery: route.params?.isDelivery,
            order_id: route.params?.order_id,

        });

    }

    return (

        <OrderContainer>
            <Header>
                <Title>{route.params?.isDelivery ? 'Delivery' : 'Mesa'} {route.params?.number}</Title>
                {items.length === 0 && ( 
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color='#ff3f4b' />
                    </TouchableOpacity> )
                }
            </Header>

            {category.length !== 0 && (

                <InputCatogary onPress={() => setModalCategoryVisible(true)}>
                <Text style={{color: '#fff'}}>
                    {categorySelected?.name}
                </Text>
                </InputCatogary>

            )}

            {products.length !== 0 && (

                <InputProduct onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: '#fff'}}>{productSelected?.name}</Text>
                </InputProduct>

            )}

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
                <ButtonAdd onPress={handleAddItem}>
                    <ActionsText>+</ActionsText>
                </ButtonAdd>
                <ButtonGo disabled={items.length === 0} onPress={handleFinishOrder}>
                    <ActionsText>Avançar</ActionsText>
                </ButtonGo>
            </ActionsContainer>

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{flex: 1, marginTop: 24}}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

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

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={() => setModalProductVisible(false)}
                    options={products}
                    selectedItem={handleChangeProduct}
                />

            </Modal>

            
        </OrderContainer>

    );

}