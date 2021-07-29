import { Table, Column, Model, PrimaryKey, AllowNull, ForeignKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Truck } from './truck';

@Table
export class Cargo extends Model<Partial<Cargo>> {
    @Default(uuidv4)
    @PrimaryKey
    @Column
    id?: string;

    @AllowNull(false)
    @ForeignKey(() => Truck)
    @Column
    truckId!: string;

    @Column
    status!: string;

    @Column
    name!: string;

    @Column
    weight!: number;

    @AllowNull(false)
    @Default(() => new Date())
    @Column
    createdOn!: Date;
}