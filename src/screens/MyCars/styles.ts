import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.colors.background_primary};

`;

export const Header = styled.View`
    width:100%;
    height: 325px;
    background-color: ${({ theme }) => theme.colors.header};
    padding:${getStatusBarHeight() + 30}px 24px 32px;
     
`;


export const Title = styled.Text`
    font-size:${RFValue(30)}px;
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    color:${({ theme }) => theme.colors.shape};
    margin-top: 40px;
`;
export const SubTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_400};
    color:${({ theme }) => theme.colors.shape};

    font-size:${RFValue(15)}px;
    line-height:${RFValue(34)}px;

    margin-top: 24px;
`;

export const Content = styled.View`
    flex: 1;
`;

export const Appointments = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding:24px
`;

export const AppointmentTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color: ${({ theme }) => theme.colors.text};

    font-size: ${RFValue(15)}px;

`;

export const AppointmentQuantity = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color: ${({ theme }) => theme.colors.title};

    font-size: ${RFValue(15)}px;
`;

export const CarWapper = styled.View`
`;

export const CarFooter = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px;
    background-color:  ${({ theme }) => theme.colors.background_secondary};
    margin:-14px 0 16px;
`;

export const CarFooterTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_500};
    color:${({ theme }) => theme.colors.shape} ;
    font-size: ${RFValue(11)}px;
    text-transform: uppercase;
`;

export const CarFooterPeriod = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CarFooterDate = styled.Text`
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color:${({ theme }) => theme.colors.text} ;
    font-size: ${RFValue(13)}px;
    line-height: ${RFValue(16)}px;
`;


