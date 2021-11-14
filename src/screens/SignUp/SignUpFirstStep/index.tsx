import React, { useState } from "react"
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"
import * as Yup from "yup"


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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [driverLicense, setDriverLicense] = useState('')

    const navigation = useNavigation()

    function handleBack() {
        navigation.goBack()
    }
    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                driverLicense: Yup.string().required('Cnh é obrigatória'),
                email: Yup.string().email('E-mail inválido').required('Email obrigatório'),
                name: Yup.string().required('Nome é obrigatório')
            })
            const data = { name, email, driverLicense }
            await schema.validate(data)
            navigation.navigate('SignUpSecondStep', { user: data })
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message)
            }
        }
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
                            <Bullet active />
                            <Bullet />
                        </Steps>

                    </Header>
                    <Title>Crie sua{'\n'}conta </Title>
                    <Subtitle>Faça seu cadastro{'\n'}de forma rápida e fácil</Subtitle>

                    <Form>
                        <FormTitle>1. Dados</FormTitle>

                        <Input
                            iconeName='user'
                            placeholder='Nome'
                            onChangeText={setName}
                            value={name}
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
                            onChangeText={setDriverLicense}
                            value={driverLicense}
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