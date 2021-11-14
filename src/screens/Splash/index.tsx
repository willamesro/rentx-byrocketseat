import React, { useEffect } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'

import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
    runOnJS
} from 'react-native-reanimated'

import {
    Container

} from './styles'

export function Splash() {
    const navigation = useNavigation()
    const splashAnimation = useSharedValue(0)
    const brandStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,
                [0, 20, 30, 50],
                [1, 0, 0, 0]
            )
        }
    })

    const logoStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                splashAnimation.value,
                [0, 20, 30, 50],
                [0, 0, 0, 1]
            )
        }
    })

    function startApp() {
        navigation.dispatch(StackActions.replace('SignIn'))
    }

    useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            { duration: 2000 },
            () => {
                'worklet'
                runOnJS(startApp)()
            }

        )
    }, [])

    return (
        <Container>
            <Animated.View style={[brandStyles, { position: 'absolute' }]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyles, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
        </Container>
    )

}
