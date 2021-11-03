import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({theme})=> theme.colors.shape};
    
    width:109px;
    height: 92px;
    margin-bottom: 8px;

    align-items:center;
    justify-content: center;
`;

export const Name = styled.Text`
    font-family: ${({theme})=>theme.fonts.primary_500};
    font-size: ${RFValue(13)}px;
    line-height: ${RFValue(15)}px;

    margin-top:14px;
`;

