import React, { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useTheme } from "styled-components"
import { api } from '../../../services/api'


import { BackButton } from "../../../components/BackButton"
import { Bullet } from "../../../components/Bullet"
import { Button } from "../../../components/Button"
import { InputPassword } from "../../../components/InputPassword"

import {
    Container,
    Header,
    Steps,
    Title,
    Subtitle,
    Form,
    FormTitle,
    Footer
} from './styles'

interface Parms {
    user: {
        name: string
        email: string
        driverLicense: string
    }
}

export function SignUpSecondStep() {
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [loadingRegister, setLoadingRegister] = useState(false)

    const navigation = useNavigation()
    const theme = useTheme()

    const { user } = useRoute().params as Parms
    const params = {
        title: 'Conta Criada',
        message: '',
        nextScreenRoute: 'SignIn'
    }


    function handleBack() {
        navigation.goBack()
    }
    async function handleRegister() {
        if (password !== passwordConfirm) {
            return Alert.alert('A senha não confere')
        }
        // Enviar para api
        setLoadingRegister(true)
        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password
        }).then(() => {
            navigation.navigate('Confirmation', { data: params })

        }).catch((err) => {
            console.log(err);

            Alert.alert('Opa', 'Não foi possivel realizar o cadastro!')
        })
        //mudar para tela de confrimação

    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />

                        <Steps>
                            <Bullet />
                            <Bullet active />
                        </Steps>

                    </Header>
                    <Title>Crie sua{'\n'}conta </Title>
                    <Subtitle>Faça seu cadastro{'\n'}de forma rápida e fácil</Subtitle>

                    <Form>

                        <FormTitle>2. Senha</FormTitle>

                        <InputPassword
                            iconeName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                        <InputPassword
                            iconeName='lock'
                            placeholder='Repetir a senha'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm}
                        />

                    </Form>

                    <Footer>
                        <Button
                            title='Cadastrar'
                            color={theme.colors.success}
                            onPress={handleRegister}
                            enabled={!!password && !!passwordConfirm}
                            loading={loadingRegister}


                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}