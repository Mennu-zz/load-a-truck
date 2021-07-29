import 'reflect-metadata';
import { TruckService } from '../service';
const mockCreateTruck = jest.fn();

jest.mock('../../../db/models/index', () => jest.fn().mockImplementation(() => ({
    Truck: {
        create: mockCreateTruck
    },
    Cargo: {
        create: mockCreateTruck
    }
})));

import 'jest';

describe('Truck Service', () => {
    it('Should create a truck and return it', async () => {
        const truckService = new TruckService();
        const expectedResponse = {
            "id": "test",
            "maxWeight": 100,
            "availableWeight": 100,
            "load": []
        }

        mockCreateTruck.mockResolvedValue(expectedResponse)
        const response = await truckService.createTruck(100);
        expect(response).toMatchObject(expectedResponse);
    })
})