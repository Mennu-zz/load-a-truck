import { injectable } from 'inversify';
import { ITruckService } from '../../interfaces/truck.interfaces';
import { BadRequest, InternalServerError } from 'http-errors';
import { Truck, Cargo, Activity } from '../../db/models/index';
import { Op } from 'sequelize'


@injectable()
export class TruckService implements ITruckService {

    public async listTrucks(): Promise<Truck[]> {
        const trucks = await Truck.findAll({ include: [{ model: Cargo, required: false, where: { status: "LOADED" } }] });
        return trucks;
    }
    public async createTruck(maxWeight: number): Promise<Truck> {
        console.log(Truck)
        const truck = await Truck.create({ maxWeight, availableWeight: maxWeight });
        return truck;
    }
    public async getTruckDetails(id: string): Promise<Truck> {
        const truck = await Truck.findOne({ where: { id }, include: [{ model: Cargo }] });
        if (!truck) {
            throw new BadRequest('Truck not found!');
        }
        return truck;
    }

    public async addCargoToTruck(name: string, weight: number): Promise<Cargo> {
        const truck = await Truck.findOne({ where: { availableWeight: { [Op.gte]: weight } } });
        if (!truck) {
            throw new BadRequest('Truck not available!');
        }

        const truckId = truck.id as string;

        const truckUpdate = await Truck.update({ availableWeight: truck.availableWeight - weight }, { where: { id: truckId, availableWeight: truck.availableWeight } });

        if (truckUpdate[0] == 0) {
            throw new InternalServerError('Truck Update failed');
        }

        const newCargo = await Cargo.create({ name, truckId, status: "LOADED", weight });

        await Activity.create({
            cargoCurrentStatus: "LOADED",
            weight,
            cargoNextStatus: "LOADED",
            cargoId: newCargo.id,
            truckId: truckId,
        })
        return newCargo;
    }

    public async unloadCargoFromTruck(truckId: string, cargoId: string): Promise<Cargo> {
        const cargo = await Cargo.findOne({ where: { id: cargoId, truckId } });
        if (!cargo) {
            throw new BadRequest('Cargo not found')
        }

        if (cargo.status !== 'LOADED') {
            throw new BadRequest('Cargo has been unloaded!')
        }

        await Truck.increment({ availableWeight: +cargo.weight }, { where: { id: truckId } });
        cargo.status = "UNLOADED";
        await Activity.create({
            cargoCurrentStatus: "LOADED",
            weight: cargo.weight,
            cargoNextStatus: "UNLOADED",
            cargoId: cargo.id,
            truckId: truckId,
            lastTrasaction: cargo.createdOn
        })
        await cargo.save();
        return cargo;
    }

    public async weightOfTruckAtTheMoment(truckId: string, day: Date): Promise<number> {
        const startDay = new Date(day.setHours(0));
        day = new Date(day.setHours(24));

        const activities = await Activity.findAll({
            where: {
                truckId,
                /**
                 * day 24
                 * createdAt <= 24,24
                 * lastTransaction >= 24,00
                 */
                [Op.or]: {
                    createdAt: {
                        [Op.lte]: day,
                    },
                    lastTrasaction: {
                        [Op.gte]: startDay
                    }
                }
            }
        })

        console.log(activities);
        const weight = activities.reduce((prev, curr) => {
            return prev + curr.weight;
        }, 0);

        return weight;


    }
}