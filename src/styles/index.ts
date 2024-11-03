import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const HEIGHT = Dimensions.get('window').height

export const Body = styled.View`
    height: ${HEIGHT}px;
`;

export const SafeAreaView = styled.SafeAreaView``;
