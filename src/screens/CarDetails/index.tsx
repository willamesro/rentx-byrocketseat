import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useTheme } from 'styled-components'
import { useNetInfo } from '@react-native-community/netinfo'



import { Accessory } from '../../components/Accessory/inde'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'
import { getAcessoryIcon } from '../../utils/getAccessoryIcon'

import { CarDTO } from '../../dtos/CarDTO'
import { Car as ModelCar } from '../../database/model/Car'
import { api } from '../../services/api'

import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Acessories,
    About,
    Footer,
    OfflineInfor

} from './styles'

interface Parms {
    car: ModelCar
}

export function CarDetails() {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
    const navigation: any = useNavigation()
    const { car } = useRoute().params as Parms
    const theme = useTheme()
    const netInfor = useNetInfo()

    const scrollY = useSharedValue(0)
    const scrollHandle = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y

    })

    const headerStyleAnimated = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0, 200],
                [200, 78],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimated = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [0, 120],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleScheduling() {
        navigation.navigate('Scheduling', { car })
    }

    function handleGoBack() {
        navigation.goBack()
    }

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
            <StatusBar barStyle='dark-content' />

            <Animated.View
                style={[
                    headerStyleAnimated,
                    {
                        position: 'absolute',
                        overflow: 'hidden',
                        zIndex: 1,
                        backgroundColor: theme.colors.background_secondary
                    }
                ]}
            >
                <Header  >
                    <BackButton onPress={handleGoBack} />
                </Header>
                <Animated.View style={[sliderCarsStyleAnimated]}>
                    <CarImages >
                        <ImageSlider imagesUrl={
                            !!carUpdated.photos ?
                                carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                        } />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    alignItems: 'center',
                    paddingTop: getStatusBarHeight() + 160

                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandle}
                scrollEventThrottle={16}

            >
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

                <About>
                    {car.about}
                </About>

            </Animated.ScrollView>

            <Footer>
                <Button
                    title='Escolher per??odo do aluguel'
                    onPress={handleScheduling}
                    enabled={netInfor.isConnected == true} />
                {!netInfor.isConnected === true && <OfflineInfor>
                    Para mais detalhes e agendamento se conecte a internet
                </OfflineInfor>}
            </Footer>

        </Container>
    )
}