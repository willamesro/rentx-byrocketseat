import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from "styled-components";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

import { CarDTO } from "../../dtos/CarDTO";

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Acessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,

    Footer,

} from "./styles";

import { Button } from "../../components/Button";
import { Accessory } from "../../components/Accessory/inde";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { getAcessoryIcon } from "../../utils/getAccessoryIcon";
import { format, parseISO } from "date-fns";
import { api } from '../../services/api'


interface Parms {
    car: CarDTO
    dates: string[]
}

interface RentalPeriodProps {
    start: string
    end: string
}

export function SchedulingDetails() {
    const [loading, setLoading] = useState(false)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps)

    const theme = useTheme()
    const navigation: any = useNavigation()
    const { car, dates } = useRoute().params as Parms
    const params = {
        title: 'Carro alugado !',
        messege: `Agora você só precisa ir\n'até a concessionária da RENTX\npegar o seu automóvel.`,
        nextScreenRoute: 'Home'
    }


    async function handleConfirmRental() {
        setLoading(true)
        const schedules_bycars = await api.get(`/schedules_bycars/${car.id}`)

        const unavailable_dates = [
            ...schedules_bycars.data.unavailable_dates,
            ...dates
        ]

        await api.post(`schedules_byuser`, {
            user_id: 1,
            car,
            startDate: rentalPeriod.start,
            endDate: rentalPeriod.end
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        }).then(() => navigation.navigate('Confirmation', {data:params}))
            .catch(() => {
                setLoading(false)
                Alert.alert('Não foi possivel completar o agendamento!')
            })

    }

    function handleBack() {
        navigation.goBack()
    }

    useEffect(() => {
        setRentalPeriod({
            start: format(parseISO(dates[0]), 'dd/MM/yyy'),
            end: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyy')
        })
    }, [])

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Acessories>
                    {
                        car.accessories.map(accessory => (
                            <Accessory
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAcessoryIcon(accessory.type)}
                            />
                        ))
                    }
                </Acessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.main_light}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{rentalPeriod.start}</DateValue>
                    </DateInfo>

                    <Feather
                        name='chevron-right'
                        size={RFValue(14)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{rentalPeriod.end}</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {car.rent.price * dates.length} </RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button
                    title='Alugue agora'
                    color={theme.colors.success}
                    enabled={!loading}
                    loading={loading}
                    onPress={handleConfirmRental} />
            </Footer>

        </Container>
    )
}