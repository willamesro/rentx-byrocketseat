import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { FlatList, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'
import { Car as ModalCar } from '../../database/model/Car'

import { Car } from '../../components/Car'
import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentTitle,
    AppointmentQuantity,
    CarWapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles'
import { BackButton } from '../../components/BackButton'
import { useTheme } from 'styled-components'
import { LoadAnimation } from '../../components/LoadAnimation'
import { format, parseISO } from 'date-fns'

interface DataProps {
    id: string
    car: ModalCar
    start_date: string,
    end_date: string
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([])
    const [loading, setLoading] = useState(true)

    const navigation: any = useNavigation()
    const theme = useTheme()
  
    function handleBack() {
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const { data } = await api.get('/rentals')
                const dataFormated = data.map((data: DataProps) => {
                    return {
                        id: data.id,
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                    }
                })
                setCars(dataFormated)

            } catch (error) {
                console.log(error)

            } finally {
                setLoading(false)
            }
        }
        fetchCars()
    }, [useIsFocused])

    return (
        <Container>
            <StatusBar barStyle='light-content' />

            <Header>
                <BackButton
                    onPress={handleBack}
                    color={theme.colors.line}

                />
                <Title>
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>
                <SubTitle>
                    Conforto, segurança e praticidade.
                </SubTitle>

            </Header>
            {loading ? <LoadAnimation /> :
                <Content>
                    <Appointments>
                        <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
                        <AppointmentQuantity>{`${cars.length < 10 ? '0' : ''}`}{cars.length}</AppointmentQuantity>
                    </Appointments>

                    <FlatList
                        data={cars}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) =>
                            <CarWapper>
                                <Car
                                    data={item.car}
                                />

                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={20}
                                            color={theme.colors.shape}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>

                                </CarFooter>
                            </CarWapper>
                        }
                        contentContainerStyle={{ padding: 24 }}
                        showsVerticalScrollIndicator={false}
                    />
                </Content>
            }
        </Container>
    )

}
