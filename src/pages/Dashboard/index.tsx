import React, { useState, useContext } from 'react';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackParamsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { 
    AreaContainer, 
    DashButton, 
    AreaInput, 
    AreaInputName,
    Title, 
    ButtonText, 
    TextSelect, 
    AreaSelect 
} from './styles';

// import { AuthContext } from '../../contexts/AuthContext';

import { api } from '../../services/api';

export default function Dashboard() {

    // const { signOut } = useContext(AuthContext);

    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [number, setNumber] = useState('');

    const [isSelected, setSelect] = useState(false);

    const [name, setName] = useState('');

    async function openOrder() {

        // if (isSelected === true && name === '') return;

        // fazer a requisição e abrir a mesa e navegar pra proxima tela

        try {

            const response = await api.post('/order', { 
                table: Number(number), 
                delivery: isSelected,
                name: name
            });

            navigation.navigate('Order', { 
                number: number,
                isDelivery: isSelected,
                order_id: response.data.id
            });

            setNumber('');
            setName('');
            setSelect(false);

        } catch(err) {

            console.log('ERRO NA REQUISIÇÃO: ', err);

        }

    }

    function handleSelect() {

        setNumber('');
        setSelect(!isSelected);

    }

    return (

        <AreaContainer>

            <Title>Novo Pedido</Title>
            <AreaInput 
                placeholder="Numero da mesa" 
                placeholderTextColor="#f0f0f0" 
                keyboardType="numeric"
                value={number}
                onChangeText={(text: string) => {

                        setNumber(text); 
                        setName('');
                    }
                }

                showInput={isSelected}
                
            />
             <AreaInputName 
                placeholder="Nome do cliente" 
                placeholderTextColor="#f0f0f0" 
                value={name}
                onChangeText={(text: string) => setName(text)}
                showInput={isSelected}
                
            />
            <AreaSelect>
                <CheckBox 
                    checkedIcon='check' 
                    uncheckedIcon='square-o' 
                    checkedColor='#3fffa3' 
                    checked={isSelected}
                    onPress={handleSelect}
                    
                />
                <TextSelect>Delivery</TextSelect>
            </AreaSelect>
            <DashButton onPress={openOrder}>
                <ButtonText>Abrir pedido</ButtonText>
            </DashButton>

        </AreaContainer>

    );

}