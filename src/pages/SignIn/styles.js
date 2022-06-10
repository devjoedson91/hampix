import styled from 'styled-components/native';

export const Container = styled.View`

    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #1d1d2e;

`;

export const Logo = styled.Image`

    margin-bottom: 18px;

`;

export const Input = styled.TextInput`

    width: 95%;
    height: 40px;
    background-color: #101026;
    margin-bottom: 12px;
    border-radius: 4px;
    padding-left: 8px;
    color: #fff;

`;

export const Button = styled.TouchableOpacity`

    width: 95%;
    height: 40px;
    background-color: #3fffa3;
    border-radius: 4px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`

    font-size: 18px;
    font-weight: bold;
    color: #101026;
`;

export const InputContainer = styled.View`

    width: 95%;
    align-items: center;
    justify-content: center;
    padding: 32px 14px 32px 14px;

`;