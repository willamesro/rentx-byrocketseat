import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';

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


export function Profile() {
    const { user, singnOut } = useAuth()

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [driverLicense, setDriverLicense] = useState(user.driver_license)

    const theme = useTheme()
    const navigation = useNavigation()


    function handleOnChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })
        if (result.cancelled) return

        if (result.uri) {
            setAvatar(result.uri)
        }
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
                            <LogoutButton onPress={singnOut}>
                                <Feather
                                    name='power'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleSelectAvatar}>
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
                                    defaultValue={user.email}

                                />
                                <Input
                                    iconeName='user'
                                    placeholder='Nome'
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                />
                                <Input
                                    iconeName='credit-card'
                                    placeholder='CNH'
                                    keyboardType='numeric'
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriverLicense}
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