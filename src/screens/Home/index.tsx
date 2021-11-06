import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'

import { useTheme } from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler
} from 'react-native-reanimated'

import Logo from '../../assets/logo.svg'
import { api } from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO'

import { Car } from '../../components/Car'
import { Load } from '../../components/Load/iindex'
import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles'
const BUttonAnimated = Animated.createAnimatedComponent(RectButton)

export function Home() {
    const navigation: any = useNavigation()
    const [cars, setCars] = useState<CarDTO[]>([])
    const [loading, setLoading] = useState(true)
    const theme = useTheme()

    const positionY = useSharedValue(0)
    const positionX = useSharedValue(0)
    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    const onGestureEvent = useAnimatedGestureHandler({
        onStart() {

        },
        onActive(event) {
            positionX.value = event.translationX
            positionY.value = event.translationY
        },
        onEnd() {

        }
    })

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car })
    }

    function handleMyCars() {
        navigation.navigate('MyCars')
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars')
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
            {loading ? <Load /> :
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
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <BUttonAnimated
                        onPress={handleMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main }]}
                    >
                        <Ionicons
                            name="ios-car-sport"
                            size={34}
                            color={theme.colors.line} />
                    </BUttonAnimated>
                </Animated.View>
            </PanGestureHandler>


        </Container>
    )

}
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30
    }
})