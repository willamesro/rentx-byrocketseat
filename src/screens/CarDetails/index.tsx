import React from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { Accessory } from "../../components/Accessory/inde";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
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
    About,
    Footer,

} from "./styles";

import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAcessoryIcon } from "../../utils/getAccessoryIcon";
import { StatusBar } from "react-native";

interface Parms {
    car: CarDTO
}

export function CarDetails() {
    const { car } = useRoute().params as Parms
    const navigation:any = useNavigation()

    function handleScheduling() {
        navigation.navigate('Scheduling', {car})
    }

    function handleGoBack() {
        navigation.goBack()
    }

    return (
        <Container>
            <StatusBar barStyle='dark-content' />
            
            <Header>
                <BackButton onPress={handleGoBack} />
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

                <About>
                    {car.about}
                </About>

            </Content>
            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleScheduling} />
            </Footer>

        </Container>
    )
}