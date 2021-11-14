import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useTheme } from "styled-components"
import * as Yup from 'yup'

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { InputPassword } from "../../components/InputPassword"

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles'

export function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [check, setCheck] = useState(false)
    const navigation = useNavigation()

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail é obrigatório').email('Infome um email válido'),
                password: Yup.string().required('A senha é obrigatoria')
            })
            await schema.validate({ email, password })
            setCheck(true)
            Alert.alert('Tudo certo')
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message)
            } else {
                Alert.alert('Erro na auteticação',
                    'Ocorreu um erro ao fazer o login, verifique as credenciais')
            }
        }
    }
    function handleNewAccount() {
        navigation.navigate('SignUpFirstStep')
    }

    return (
        <KeyboardAvoidingView
            behavior='position'
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <Title>
                            Estamos{'\n'}quase lá.
                        </Title>
                        <SubTitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconeName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />

                        <InputPassword
                            iconeName='lock'
                            placeholder='Senha'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setPassword}
                            value={password}
                        />

                    </Form>

                    <Footer>
                        <Button
                            title='Login'
                            onPress={handleSignIn}
                            enabled={(!!password && !!email)}
                            loading={check}
                        />
                        <Button
                            title='Criar conta gratuita'
                            color={useTheme().colors.background_secondary}
                            light
                            onPress={handleNewAccount}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}