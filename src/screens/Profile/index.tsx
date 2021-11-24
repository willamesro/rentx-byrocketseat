import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import { HeaderTitle } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import { Container, Header, HeaderTop, LogoutButton, Photo, PhotoContainer } from './styles'

export function Profile() {
    const theme = useTheme()
    const navigation = useNavigation()

    function handleSignOut() {

    }

    function handleBack() {
        navigation.goBack()
    }
    return (
        <Container>
            <Header>
                <HeaderTop>
                    <BackButton
                        color={theme.colors.shape}
                        onPress={handleBack}
                    />
                    <HeaderTitle>Editar perfil</HeaderTitle>
                    <LogoutButton onPress={handleSignOut}>
                        <Feather
                            name='power'
                            size={24}
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeaderTop>
                <PhotoContainer>
                    <Photo source={{ uri:'https://avatars.githubusercontent.com/u/58307770?v=4'}} />
                </PhotoContainer>
            </Header>
        </Container>
    )
}