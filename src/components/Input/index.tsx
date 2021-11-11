import React from 'react'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import {
    Container,
    IconContainer,
    InputText
} from './styles'

interface Props extends TextInputProps {
    iconeName: React.ComponentProps<typeof Feather>['name']
}

export function Input({ iconeName, ...rest }: Props) {
    const theme = useTheme()
    return (
        <Container>
            <IconContainer>

                <Feather
                    name={iconeName}
                    size={24}
                    color={theme.colors.text}
                />
            </IconContainer>

            <InputText {...rest} />

        </Container>
    )
}