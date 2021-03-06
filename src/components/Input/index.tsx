import React, { useState } from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import {
    Container,
    IconContainer,
    InputText,
    LineFocused
} from './styles'

interface Props extends TextInputProps {
    iconeName: React.ComponentProps<typeof Feather>['name']
    value?: string
}

export function Input({ iconeName, value, ...rest }: Props) {
    const theme = useTheme()

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    function handleInputFocused() {
        setIsFocused(true)
    }
    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!value)

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
                    onFocus={handleInputFocused}
                    onBlur={handleInputBlur}
                    {...rest} />

            </Container>
            <LineFocused isFocused={isFocused}/>
        </>
    )
}