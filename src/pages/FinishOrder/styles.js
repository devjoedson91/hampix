import styled from 'styled-components/native';

export const Container = styled.View`

    flex: 1;
    background-color: #1d1d2e;
    padding: 5% 4% 5% 4%;
    align-items: center;
    justify-content: center;

`;

export const Alert = styled.Text`

    font-size: 20px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 12px;

`;

export const Title = styled.Text`

    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 12px;
`;

export const TextButton = styled.Text`

    font-size: 18px;
    margin-right: 8px;
    font-weight: bold;
    color: #1d1d2e;

`;

export const Button = styled.TouchableOpacity`

    background-color: #3fffa3;
    flex-direction: row;
    width: 65%;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

`;