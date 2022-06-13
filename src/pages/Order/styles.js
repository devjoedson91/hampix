import styled from 'styled-components/native';

export const OrderContainer = styled.View`

    flex: 1;
    background-color: #1d1d2e;
    padding: 5% 4% 5% 4%;


`;

export const Header = styled.View`

    flex-direction: row;
    margin-bottom: 12px;
    align-items: center;
    margin-top: 24px;
`;

export const Title = styled.Text`

    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin-right: 14px;
`;

export const InputCatogary = styled.TouchableOpacity`

    background-color: #101026;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    margin-bottom: 12px;
    justify-content: center;
    padding-left: 8px;
    padding-right: 8px;
`;

export const InputProduct = styled.TouchableOpacity`

    background-color: #101026;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    margin-bottom: 12px;
    justify-content: center;
    padding-left: 8px;
    padding-right: 8px;
    
`;

export const QtdContainer = styled.View`

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`;

export const QtdText = styled.Text`

    font-size: 20px;
    font-weight: bold;
    color: #fff;

`;

export const QtdInput = styled.TextInput`

    background-color: #101026;
    border-radius: 4px;
    width: 60%;
    height: 40px;
    margin-bottom: 12px;
    text-align: center;
    justify-content: center;
    padding-left: 8px;
    padding-right: 8px;
    color: #fff;
    font-size: 20px;


`;

export const ActionsContainer = styled.View`

    flex-direction: row;
    width: 100%;
    justify-content: space-between;

`;

export const ButtonAdd = styled.TouchableOpacity`

    width: 20%;
    background-color: #3fd1ff;
    border-radius: 4px;
    height: 40px;
    justify-content: center;
    align-items: center;

`;

export const ButtonGo = styled.TouchableOpacity`

    background-color: #3fffa3;
    border-radius: 4px;
    width: 75%;
    height: 40px;
    align-items: center;
    justify-content: center;

`;

export const ActionsText = styled.Text`

    color: #101026;
    font-size: 18px;
    font-weight: bold;

`;