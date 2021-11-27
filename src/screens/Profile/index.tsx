import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup'
import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { Button } from '../../components/Button';

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
    const { user, singnOut, updatedUser } = useAuth()

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
    const [avatar, setAvatar] = useState(user.avatar)
    const [name, setName] = useState(user.name)
    const [driverLicense, setDriverLicense] = useState(user.driver_license)

    const theme = useTheme()
    const navigation = useNavigation()


    function handleOnChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected)
    }
    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('A CNH é obrigatória'),
                name: Yup.string().required('Nome é obrigatóri0')
            })
            const data = { name, driverLicense }
            await schema.validate(data)

            await updatedUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            })
            Alert.alert('Perfil atualizado')

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message)
            } else {
                Alert.alert('Não foi possive atualiza o perfil')
            }
        }
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
                        <Button
                            title='Salvar alterações'
                            onPress={handleProfileUpdate}
                        />

                    </Content>
                </Container>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    )
}