import React, { useState, createContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

// tipagens

type AuthContextData = {

    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>; // <void> promise nao vai devolver nada
    signOut: () => Promise<void>;
    loadingAuth: boolean;
    loading: boolean

}

type UserProps = {

    id: string;
    name: string;
    email: string;
    token: string;

}

type AuthProviderProps = {

    children: ReactNode;

}

type SignInProps = { // propriedade de login que serão fornecidas no contexto

    email: string;
    password: string;

}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>({

        id: '',
        name: '',
        email: '',
        token: ''

    });

    const [loadingAuth, setLoadingAuth] = useState(false); // controle ao logar, se esta carregando ou não
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name; // se user.name for vazio, essa variavel terá valor false e vice versa

    useEffect(() => {

        async function getUser() {
            // pegar os dados salvos do user

            const userInfo = await AsyncStorage.getItem('@hampix');

            let hasUser: UserProps = JSON.parse(userInfo || '{}');

            // verificar se recebemos as informações

            if (Object.keys(hasUser).length > 0) {

                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;

                setUser({ 
                    id: hasUser.id, 
                    name: hasUser.name, 
                    email: hasUser.email, 
                    token: hasUser.token 
                });

            }

            setLoading(false);

        }

        getUser();

    }, []);

    // metodo para fazer login

    async function signIn({email, password}: SignInProps) {

        setLoadingAuth(true);

        try {

            const response = await api.post('/session', { email, password })

            const { id, name, token } = response.data;

            const data = { ...response.data } // convertendo o objeto para string no asyncStorage

            await AsyncStorage.setItem('@hampix', JSON.stringify(data));

            // informando o token do usuario para todas as rotas

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setUser({ id, name, email, token });

            setLoadingAuth(false);

        } catch(err) {

            console.log('erro ao acessar', err);
            setLoadingAuth(false); //  parar o loading
        }

    }

    // metodo para fazer logout

    async function signOut() {

        await AsyncStorage.clear()
            .then(() => {

                setUser({ id: '', name: '', email: '', token: '' });

            })

    }

    return (

       <AuthContext.Provider value={{ user, isAuthenticated, loading, loadingAuth, signIn, signOut }}>

            {children}

       </AuthContext.Provider>

    );

}