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

export function SignUpFirstStep() {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [cnh, setCnh] = useState('')
    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
    }
    function handleNextStep(){
        navigation.navigate('SignUpSecondStep')
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
                    <FormTitle>1. Dados</FormTitle>

                        <Input
                            iconeName='user'
                            placeholder='Nome'
                            onChangeText={setUser}
                            value={user}
                        />
                        <Input
                            iconeName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setEmail}
                            value={email}
                        />
                        <Input
                            iconeName='credit-card'
                            placeholder='Cnh'
                            keyboardType='numeric'
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={setCnh}
                            value={cnh}
                        />

                    </Form>

                    <Footer>
                        <Button
                            title='Próximo'
                            onPress={handleNextStep}
                        />

                    </Footer>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}