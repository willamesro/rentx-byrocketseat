import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

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

interface CarProps {
    id: string
    user_id: string,
    startDate: string,
    endDate: string
    car: CarDTO
}

export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)

    const navigation: any = useNavigation()
    const theme = useTheme()
    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car })
    }
    function handleBack() {
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1 ')
                setCars(response.data)

            } catch (error) {
                console.log(error)

            } finally {
                setLoading(false)
            }
        }
        fetchCars()
    }, [])

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
                                // onPress={() => handleCarDetails(item.car)}
                                />

                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name='arrowright'
                                            size={20}
                                            color={theme.colors.shape}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
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
