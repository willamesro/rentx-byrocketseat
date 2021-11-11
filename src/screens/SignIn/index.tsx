import React from "react"
import { useTheme } from "styled-components"

import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer
} from './styles'

export function SignIn() {
    return (
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
                    autoCapitalize='none' />

                <Input iconeName='lock' placeholder='Senha'  />

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
    )
}