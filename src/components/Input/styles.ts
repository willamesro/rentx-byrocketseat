import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native"

export const Container = styled.View`
    flex-direction:row;
    margin-bottom:8px;
`;
export const IconContainer = styled.View`
  height:56px;
  width:55px;
  align-items:center;
  justify-content:center;

    background-color: ${({ theme }) => theme.colors.background_secondary};
    margin-right:1px;
`;


export const InputText = styled.TextInput`
    flex: 1;
    font-size:${RFValue(15)}px;
    padding:0 23px;

    font-family: ${({ theme }) => theme.fonts.primary_400};
    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
`;