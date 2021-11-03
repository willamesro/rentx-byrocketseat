
import SpeedSvg from '../assets/speed.svg'
import AccelerationSvg from '../assets/acceleration.svg'
import FoceSvg from '../assets/force.svg'
import ExchangeSvg from '../assets/exchange.svg'
import PeopleSvg from '../assets/people.svg'
import GasolineSvg from '../assets/gasoline.svg'
import EnergySvg from '../assets/energy.svg'
import HybridSvg from '../assets/hybrid.svg'
import CarSvg from '../assets/car.svg'

export function getAcessoryIcon(type: string) {
    switch (type) {
        case 'speed': return SpeedSvg

        case 'acceleration': return AccelerationSvg

        case 'turning_diameter': return FoceSvg

        case 'electric_motor': return EnergySvg

        case 'gasoline_motor': return GasolineSvg

        case 'hybrid_motor': return HybridSvg

        case 'exchange': return ExchangeSvg

        case 'seats': return PeopleSvg

        default: return CarSvg
    }
}