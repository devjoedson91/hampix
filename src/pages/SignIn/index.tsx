import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Logo, Input, Button, ButtonText, InputContainer } from './styles';

import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {

        if (email === '' || password === '') return;

        await signIn({ email, password })

    }

    return (

        <Container>
            
            <Logo 
                source={require('../../assets/logo.png')}
            
            />

            <InputContainer>

                <Input 
                    placeholder='Digite seu email'
                    placeholderTextColor='#f0f0f0'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />

                <Input 
                    placeholder='Sua senha'
                    placeholderTextColor='#f0f0f0'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <Button onPress={handleLogin}>
                    { loadingAuth ? ( <ActivityIndicator size={25} color="#fff" /> ) : (<ButtonText>Acessar</ButtonText>)}
                </Button>
            
            </InputContainer>


        </Container>

    );
}

