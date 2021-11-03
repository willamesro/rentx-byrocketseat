import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ButtonProps extends RectButtonProps{
    color:string
}
export const Container = styled(RectButton)<ButtonProps>`
    background-color: ${({ color, theme }) => color };
    
    align-items:center;
    justify-content: center;

    padding: 20px;
`;
export const Title = styled.Text`
    font-family: ${({theme})=> theme.fonts.primary_500};
    color:${({ theme }) => theme.colors.main_light};

    font-size: ${RFValue(15)}px;

`;
