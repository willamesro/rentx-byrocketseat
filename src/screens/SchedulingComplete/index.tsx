import React from 'react';
import { useNavigation } from '@react-navigation/native';
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

export function SchedulingComplete() {

    const navigation: any = useNavigation()
    function handleHome() {
        navigation.navigate('Home')
    }

    const { width } = useWindowDimensions()
    return (
        <Container>
            <StatusBar barStyle='light-content' />
            <LogoSvg width={width} />
            <Content>
                <DoneSvg width={80} height={80} />
                <Title>Carro alugado !</Title>
                <Messege>
                    Agora você só precisa ir{'\n'}
                    até a concessionária da RENTX{'\n'}
                    pegar o seu automóvel.
                </Messege>
            </Content>
            <Footer>
                <ConfirmButton title='Ok' onPress={handleHome} />
            </Footer>

        </Container>
    )
}