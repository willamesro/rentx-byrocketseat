import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo'

import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'

import { Car } from '../../components/Car'
import { Car as ModelCar } from '../../database/model/Car'
import { LoadAnimation } from '../../components/LoadAnimation'

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
} from './styles'

export function Home() {
    const [cars, setCars] = useState<ModelCar[]>([])
    const [loading, setLoading] = useState(true)

    const navigation: any = useNavigation()
    const netInfor = useNetInfo()

    function handleCarDetails(car: ModelCar) {
        navigation.navigate('CarDetails', { car })
    }

    async function offilineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
                const { changes, latestVersion } = response.data
                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users
                
                await api.post('/users/sync', user).catch(console.log)
            }
           
        })
    }


    useEffect(() => {
        let isMouted = true
        async function fetchCars() {
            try {
                const carCollection = database.get<ModelCar>('cars')
                const cars = await carCollection.query().fetch()
                if (isMouted) { setCars(cars) }

            } catch (error) {
                console.log(error)

            } finally {
                if (isMouted) { setLoading(false) }
            }
        }
        fetchCars()

        return () => { isMouted = false }
    }, [])

    useEffect(() => {
        if (netInfor.isConnected === true) {
            offilineSynchronize()
        }
    }, [netInfor.isConnected])


    return (
        <Container>

            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>
                </HeaderContent>

            </Header>
            {loading ? <LoadAnimation /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                        <Car
                            data={item}
                            onPress={() => handleCarDetails(item)}
                        />
                    }
                />
            }

        </Container>
    )

}
