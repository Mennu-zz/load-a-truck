import { Container } from 'inversify';
import TYPES from './constants/types';
import { TruckController, TruckService } from './domain/trucks';
export class ContainerLoader {
    public static load(): Container {
        const container = new Container();
        container.bind<TruckController>(TYPES.TruckController).to(TruckController);
        container.bind<TruckService>(TYPES.TruckService).to(TruckService);
        return container;
    }
}