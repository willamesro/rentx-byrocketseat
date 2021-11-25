import styled from 'styled-components/native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface OptionsProps {
    active: boolean
}
export const Container = styled.View`
    background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.header};
    
    width:100%;
    height: 227px;
    padding: 0 24px;
    align-items: center;

`;

export const HeaderTop = styled.View`
    width: 100%;
    flex-direction: row;
    margin-top: ${getStatusBarHeight() + 30}px;
    justify-content: space-between;
    align-items: center;
`;

export const HeaderTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.secondary_600};
    font-size: ${RFValue(25)}px;

    color: ${({ theme }) => theme.colors.shape};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
    width:180px; 
    height:180px;
    border-radius: 90px;
    margin-top: 48px;
    background-color: ${({ theme }) => theme.colors.background_primary};
    align-items: center;
    justify-content: center;
`;

export const Photo = styled.Image`
    width:174px; 
    height:174px;
    border-radius: 87px;
`;
export const PhotoButton = styled(RectButton)`
    position:absolute;
    right: 10px;
    bottom:10px;
    width:40px;
    height:40px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.main};

`;

export const Content = styled.View`
    width: 100%;
   
    margin-top: 122px;
    border-bottom-width: 1px;
    padding: 0 24px;
    border-bottom-color: ${({ theme }) => theme.colors.line}  
`;

export const Options = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    /* margin-left: 52px; */
    padding: 0 32px;
    margin-bottom: 24px;

`;
export const Option = styled.TouchableOpacity<OptionsProps>`
    padding-bottom:14px ;
    border-bottom-width: ${({ active }) => active ? 2 : 0}px;
    border-bottom-color: ${({ theme }) => theme.colors.main};

`;

export const OptionTitle = styled.Text<OptionsProps>`
    font-family: ${({ theme, active }) => active ? theme.fonts.secondary_600 : theme.fonts.secondary_400};
    color: ${({ theme, active }) => active ? theme.colors.title : theme.colors.shape};
    font-size: ${RFValue(20)}px;
`;

export const Section = styled.View`
    
`;