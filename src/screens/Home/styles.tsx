import styled from 'styled-components/native'
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CarDTO } from '../../dtos/CarDTO'
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex:1;
    background-color: ${({ theme }) => theme.colors.background_primary};

`;
export const Title = styled.Text`
   font-size:24px;
   color: ${({ theme }) => theme.colors.text_datail};
   font-family: ${({ theme }) => theme.fonts.secondary_600};
`;
export const Header = styled.View`
    width:100%;
    height: 113px;
    background-color: ${({ theme }) => theme.colors.header};
    justify-content: flex-end;
    padding:0 24px 32px;
     
`;
export const HeaderContent = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TotalCars = styled.Text`
    font-size:${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};
    color:${({ theme }) => theme.colors.text};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
    contentContainerStyle: {
        padding: 24
    },
    showsVerticalScrollIndicator: false
})``;

export const MyCarsButton = styled(RectButton)`
    background-color:${({ theme }) => theme.colors.main};
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius:30px;
    position: absolute;
    bottom: 15px;
    right: 22px;
`;