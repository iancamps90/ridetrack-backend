import { Table, Column, Model, ForeignKey, DataType } from "sequelize-typescript";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "activities",
})
export class Activity extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    source!: string; // "Strava" o "Garmin"

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    activityType!: string; // "Ciclismo", "Rodillo", etc.

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    distance!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    duration!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    averageHeartRate!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    averagePower!: number;
}
