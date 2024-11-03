import { Dimensions } from 'react-native';
import styled from 'styled-components/native'
import colors from './colors';

type ButtonProps = {
    backgroundColor?: string
}

export const WIDTH = Dimensions.get('window').width;

export const ButtonContainer = styled.View`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
    width: ${WIDTH}px;
    margin-vertical: 10px;
    margin-horizontal: 2px;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: 3px;
    width: ${WIDTH * 0.44}px;
    height: 50px;
    backgroundColor: ${props => props.backgroundColor};
`;


export const ButtonLabel = styled.Text`
    font-size: 23px;
    font-weight: bold;
    color: ${colors.white}
`;
