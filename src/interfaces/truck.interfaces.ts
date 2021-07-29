import { Cargo, Truck } from "../db/models";

export interface ITruckService {
    listTrucks(): Promise<Truck[]>,
    createTruck(maxWeight: number): Promise<Truck>,
    getTruckDetails(id: string): Promise<Truck>,
    addCargoToTruck(name: string, weight: number): Promise<Cargo>,
    unloadCargoFromTruck(truckId: string, cargoId: string): Promise<Cargo>,
    weightOfTruckAtTheMoment(truckId: string, day: Date): Promise<Number>,
}