import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.header};
    padding-top:  96px;
`;

export const Content = styled.View`
    flex:1;
    align-items:center;
    justify-content: center;


`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.main_light};

    font-size: ${RFValue(30)}px;
    line-height:${RFValue(33)}px;

    margin-top: 45px;
`;

export const Messege = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;

    font-size: ${RFValue(15)}px;
    line-height:${RFValue(25)}px;

    margin-top: 16px;
    
`;
export const Footer = styled.View`
    width: 100%;
    align-items: center;
    margin: 80px 0;
`;
