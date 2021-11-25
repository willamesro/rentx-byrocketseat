import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles'
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

export function Profile() {
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const theme = useTheme()
    const navigation = useNavigation()

    function handleSignOut() {

    }
    function handleOnChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
    }

    function handleBack() {
        navigation.goBack()
    }
    return (
        <KeyboardAvoidingView behavior='position' enabled >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >


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
                            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/58307770?v=4' }} />
                            <PhotoButton>
                                <Feather
                                    name='camera'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option
                                active={option === 'dataEdit'}
                                onPress={() => handleOnChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option
                                active={option === 'passwordEdit'}
                                onPress={() => handleOnChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {option === 'dataEdit' ?
                            <Section >
                                <Input
                                    iconeName='mail'
                                    editable={false}
                                />
                                <Input
                                    iconeName='user'
                                    placeholder='Nome'
                                    autoCorrect={false}
                                />
                                <Input
                                    iconeName='credit-card'
                                    placeholder='CNH'
                                    keyboardType='numeric'
                                />
                            </Section>
                            :
                            <Section >
                                <InputPassword
                                    iconeName='lock'
                                    placeholder='Senha atual'
                                />
                                <InputPassword
                                    iconeName='lock'
                                    placeholder='Nova senha'
                                />
                                <InputPassword
                                    iconeName='lock'
                                    placeholder='Repita a nova senha'
                                />


                            </Section>
                        }

                    </Content>
                </Container>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
}