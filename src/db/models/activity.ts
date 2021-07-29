import { Table, Column, Model, HasMany, PrimaryKey, AllowNull, Default, CreatedAt } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Cargo } from './cargo';
import { Truck } from './truck';

@Table
export class Activity extends Model<Partial<Activity>> {
    @Default(uuidv4)
    @PrimaryKey
    @Column
    id?: string;

    @AllowNull(false)
    @Column
    cargoCurrentStatus!: string;

    @AllowNull(false)
    @Column
    cargoNextStatus!: string;

    @AllowNull(false)
    @Column
    weight!: number;

    @AllowNull(false)
    @Column
    cargoId!: string;

    @AllowNull(false)
    @Column
    truckId!: string;

    @AllowNull(false)
    @Default(() => new Date())
    @Column
    createdAt!: Date;

    @AllowNull(false)
    @Default(() => new Date())
    @Column
    lastTrasaction!: Date;

}