import React, { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Keyboard, KeyboardAvoidingView,TouchableWithoutFeedback } from "react-native"

import { BackButton } from "../../../components/BackButton"
import { Bullet } from "../../../components/Bullet"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"

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
import { InputPassword } from "../../../components/InputPassword"

export function SignUpSecondStep() {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [cnh, setCnh] = useState('')
    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
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
                            <Bullet  />
                            <Bullet  />
                        </Steps>

                    </Header>
                        <Title>Crie sua{'\n'}conta </Title>
                        <Subtitle>Faça seu cadastro{'\n'}de forma rápida e fácil</Subtitle>

                    <Form>
                    <FormTitle>2. Senha</FormTitle>

                        <InputPassword
                            iconeName='lock'
                            placeholder='Senha'
                            onChangeText={setUser}
                            value={user}
                        />
                        <InputPassword
                            iconeName='lock'
                            placeholder='Repetir a senha'
                            
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />
                       

                    </Form>

                    <Footer>
                        <Button
                            title='Próximo'
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