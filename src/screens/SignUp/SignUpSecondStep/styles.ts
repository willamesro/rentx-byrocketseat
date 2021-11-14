import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native'

export const Container = styled.View`
    padding: 0 24px;
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: ${getStatusBarHeight() + 31}px;
`;
export const Steps = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    margin-top: 48px;
    font-size: ${RFValue(40)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};

`;
export const Subtitle = styled.Text`
    margin-top: 16px;
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};
`;


export const Form = styled.View`
    margin-top: 64px;
    justify-content: space-between;
`;
export const FormTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color: ${({ theme }) => theme.colors.title};
    margin-bottom: 24px;
`;

export const Footer = styled.View`
`;

