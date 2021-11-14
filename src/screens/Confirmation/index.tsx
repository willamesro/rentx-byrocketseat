import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, useWindowDimensions } from 'react-native';
import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
    Container,
    Content,
    Title,
    Messege,
    Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Parms {
    data: {
        title: string
        message: string
        nextScreenRoute: string
    }
}

export function Confirmation() {

    const navigation = useNavigation()
    function handleHome() {
        navigation.navigate(data.nextScreenRoute)
    }
    const { data } = useRoute().params as Parms

    const { width } = useWindowDimensions()
    return (
        <Container>
            <StatusBar barStyle='light-content' />
            <LogoSvg width={width} />
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>{data.title}</Title>
                <Messege>{data.message}</Messege>
            </Content>
            <Footer>
                <ConfirmButton title='Ok' onPress={handleHome} />
            </Footer>

        </Container>
    )
}