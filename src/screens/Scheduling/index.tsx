import React, { useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";

import ArrowSvg from '../../assets/arrow.svg'

import { Calendar, DayProps, MarkedDateProps } from "../../components/Calendar";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { CarDTO } from "../../dtos/CarDTO";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,

} from "./styles";
import { format, parseISO } from "date-fns";

interface Parms {
    car: CarDTO
}
interface RentalPeriod {
    startFormatted: string
    endFormatted: string
}

export function Scheduling() {
    const [lastSelectedData, setLastSelectedData] = useState<DayProps>({} as DayProps)
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
    const [rentalPeiodo, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const theme = useTheme()
    const navigation: any = useNavigation()
    const { car } = useRoute().params as Parms

    function handleConfirmRental() {
     
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
    }

    function handleBack() {
        navigation.goBack()
    }

    function handleChangeDate(date: DayProps) {
        let start = !lastSelectedData.timestamp ? date : lastSelectedData
        let end = date

        if (start.timestamp > end.timestamp) {
            start = end
            end = start
        }

        setLastSelectedData(end)
        const interval = generateInterval(start, end)

        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const lastDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentalPeriod({
            startFormatted: format(parseISO(firstDate), 'dd/MM/yyy'),
            endFormatted: format(parseISO(lastDate), 'dd/MM/yyy')
        })
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" />
            <Header>
                <BackButton
                    color={theme.colors.shape}
                    onPress={handleBack}
                />
                <Title>Escolha uma {'\n'}
                    data de início e{'\n'}
                    fim do aluguel
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue selected={!!rentalPeiodo.startFormatted}>{rentalPeiodo.startFormatted}</DateValue>
                    </DateInfo>

                    <ArrowSvg />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue selected={!!rentalPeiodo.endFormatted}>{rentalPeiodo.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>

            <Content>
                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleChangeDate}

                />
            </Content>

            <Footer>
                <Button
                    title='Confirmar'
                    onPress={handleConfirmRental}
                    enabled={!!rentalPeiodo.endFormatted}
                />
            </Footer>

        </Container>
    )
}