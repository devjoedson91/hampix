import styled from 'styled-components/native';

export const AreaContainer = styled.SafeAreaView`

    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: #1d1d2e;

`;

export const DashButton = styled.TouchableOpacity`

    width: 90%;
    height: 40px;
    background-color: #3fffa3;
    border-radius: 4px;
    margin-top: 12px;
    justify-content: center;
    align-items: center;

`;

export const AreaInput = styled.TextInput`

    width: 90%;
    height: 60px;
    background-color: #101026;
    border-radius: 4px;
    padding-left: 8px;
    text-align: center;
    font-size: 22px;
    color: #fff;
    display: ${props => props.showInput ? 'none' : 'flex'};

`;

export const AreaInputName = styled.TextInput`

    width: 90%;
    height: 60px;
    background-color: #101026;
    border-radius: 4px;
    padding-left: 8px;
    text-align: center;
    font-size: 22px;
    color: #fff;
    display: ${props => props.showInput ? 'flex' : 'none'};

`;

export const Title = styled.Text`

    font-size: 30px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 24px;

`;

export const ButtonText = styled.Text`

    font-size: 18px;
    color: #101026;
    font-weight: bold;

`;

export const TextSelect = styled.Text`

    font-size: 18px;
    color: #fff;

`;

export const AreaSelect = styled.View`

    display: flex;
    flex-direction: row;
    align-items: center;

`;

