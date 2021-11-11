import React, { useState } from "react"
import { Keyboard, KeyboardAvoidingView } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useTheme } from "styled-components"

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
                            onPress={() => { }}
                        // enabled={false}
                        // loading={false}
                        />
                        <Button
                            title='Criar conta gratuita'
                            color={useTheme().colors.background_secondary}
                            light
                            onPress={() => { }}
                        // enabled={false}
                        // loading={false}
                        />
                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}