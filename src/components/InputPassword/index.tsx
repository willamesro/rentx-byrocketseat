import React, { useState } from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import {
    Container,
    IconContainer,
    InputText,
    LineFocused,
} from './styles'

interface Props extends TextInputProps {
    iconeName: React.ComponentProps<typeof Feather>['name']
    value?: string
}

export function InputPassword({ iconeName, value, ...rest }: Props) {

    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    function handleInputFocused() {
        setIsFocused(true)
    }
    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!value)

    }
    const theme = useTheme()

    function handlePasswordVisibilityChange() {
        setIsPasswordVisible(prevState => !prevState)
    }

    return (
        <>
            <Container >
                <IconContainer>

                    <Feather
                        name={iconeName}
                        size={24}
                        color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_datail}

                    />
                </IconContainer>

                <InputText
                    placeholderTextColor={theme.colors.text_datail}
                    secureTextEntry={isPasswordVisible}
                    onFocus={handleInputFocused}
                    onBlur={handleInputBlur}
                    {...rest} />

                <BorderlessButton onPress={handlePasswordVisibilityChange} >
                    <IconContainer>
                        <Feather
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={24}
                            color={theme.colors.text_datail}
                        />
                    </IconContainer>
                </BorderlessButton>

            </Container>
            <LineFocused isFocused={isFocused} />
        </>
    )
}