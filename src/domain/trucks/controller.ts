import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestParam, requestBody, httpPatch, queryParam } from 'inversify-express-utils';
import TYPES from '../../constants/types';
import { Cargo, Truck } from '../../db/models';
import { ITruckService } from '../../interfaces/truck.interfaces';

@controller('/api/trucks')
export class TruckController {
    constructor(@inject(TYPES.TruckService) private truckService: ITruckService) { }

    @httpGet('/')
    public async listTrucks(): Promise<Truck[]> {
        return await this.truckService.listTrucks();
    }

    @httpPost('/')
    public async createTruck(@requestBody() payload: Record<string, number>): Promise<Truck> {
        const { maxWeight } = payload;
        return await this.truckService.createTruck(maxWeight);
    }

    @httpGet('/:id')
    public async getTuckDetails(@requestParam('id') truckId: string): Promise<Truck> {
        return await this.truckService.getTruckDetails(truckId);
    }


    @httpPost('/addCargo')
    public async addCargoToTruck(@requestBody() payload: Record<string, string | number>): Promise<Cargo> {
        const { name, weight } = payload;
        return await this.truckService.addCargoToTruck(name as string, weight as number)
    }

    @httpPatch('/:truckId/removeCargo/:cargoId')
    public async unloadCargoFromTruck(@requestParam('truckId') truckId: string, @requestParam('cargoId') cargoId: string): Promise<Cargo> {
        return await this.truckService.unloadCargoFromTruck(truckId, cargoId);
    }

    @httpGet('/:truckId/getWeight')
    public async getTruckWeightOnDay(@queryParam('day') day: Date, @requestParam('truckId') truckId: string): Promise<any> {
        const weight = await this.truckService.weightOfTruckAtTheMoment(truckId, new Date(day));
        console.log(weight);
        return {
            weight
        }
    }
}