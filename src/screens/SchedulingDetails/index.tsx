import React, { useEffect, useState } from "react";
import { Alert, StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth'
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
import { useNetInfo } from "@react-native-community/netinfo";


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
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps)
    const netInfor = useNetInfo()
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

        const totalPrice = car.price * dates.length
        await api.post('rentals', {
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: totalPrice
        }).then(() => navigation.navigate('Confirmation', { data: params }))
            .catch((error) => {
                console.log(error);

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

    useEffect(() => {
        async function fetCarUpdated() {
            const response = await api.get(`/cars/${car.id}`)
            setCarUpdated(response.data)
        }
        if (netInfor.isConnected === true) {
            fetCarUpdated()
        }

    }, [netInfor.isConnected])

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={
                    !!carUpdated.photos ?
                        carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                } />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {(netInfor.isConnected === true) ? carUpdated.price : `---`}</Price>
                    </Rent>
                </Details>
                <Acessories>
                    {!!carUpdated.accessories &&
                        <Acessories>
                            {
                                carUpdated.accessories.map(accessory => (
                                    <Accessory
                                        key={accessory.type}
                                        name={accessory.name}
                                        icon={getAcessoryIcon(accessory.type)}
                                    />
                                ))
                            }
                        </Acessories>
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
                        <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {car.price * dates.length} </RentalPriceTotal>
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