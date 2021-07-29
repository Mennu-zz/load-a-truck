import { Table, Column, Model, HasMany, PrimaryKey, AllowNull, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Cargo } from './cargo';

@Table
export class Truck extends Model<Partial<Truck>> {
    @Default(uuidv4)
    @PrimaryKey
    @Column
    id?: string;

    @AllowNull(false)
    @Column
    maxWeight!: number;

    @AllowNull(false)
    @Default(() => 0)
    @Column
    availableWeight!: number;

    @HasMany(() => Cargo)
    load?: Cargo[];
}