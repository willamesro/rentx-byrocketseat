import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

export const Container = styled(RectButton)`
    width:100%;
    height:126px;
    
    padding: 24px;
    margin-bottom: 16px;

    background-color: ${({ theme }) => theme.colors.background_secondary};
   
    flex-direction: row;
    justify-content:space-between;
    align-items: center;

   
`;
export const Details = styled.View`

`;

export const Brand = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text_datail};
    
    font-size: ${RFValue(10)}px;
    line-height: ${RFValue(11)}px;
    margin-bottom: 4px;

    text-transform: uppercase;
`;

export const Name = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.title};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(16)}px;
    margin-bottom: 16px;
    
`;

export const About = styled.View`
   flex-direction: row;
   align-items: flex-end; 

`;

export const Rent = styled.View`
    margin-right: 24px;
    
`;

export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.text_datail};
    
    font-size: ${RFValue(10)}px;
    line-height: ${RFValue(11)}px;
    margin-bottom: 4px;

    text-transform: uppercase;
`;

export const Price = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.main};

    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(16)}px;
`;

export const Type = styled.View``;

export const CarImage = styled(FastImage)`
    width: 167px;
    height: 92px;
`;