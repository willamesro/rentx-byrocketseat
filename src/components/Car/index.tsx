import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler'

import { Car as ModelCar } from '../../database/model/Car'
import { useNetInfo } from '@react-native-community/netinfo'

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,

} from './styles';

export interface CarData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number
    },
    thumbnail: string
}

import { getAcessoryIcon } from '../../utils/getAccessoryIcon';
import { useTheme } from 'styled-components';

interface Props extends RectButtonProps {
    data: ModelCar
}


export function Car({ data, ...rest }: Props) {
    const MotorIcon = getAcessoryIcon(data.fuel_type)
    const netInfor = useNetInfo()
    const theme = useTheme()

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name} </Name>

                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`R$ ${(netInfor.isConnected ===true)?data.price: '---'}`} </Price>
                    </Rent>
                    <Type>
                        <MotorIcon fill={theme.colors.title} />
                    </Type>
                </About>

            </Details>
            <CarImage source={{ uri: data.thumbnail }} resizeMode='contain' />

        </Container>
    )
}