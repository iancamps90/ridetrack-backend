import { Table, Column, Model, ForeignKey, DataType } from "sequelize-typescript";
import { User } from "./User";

@Table({
    timestamps: true,
    tableName: "workouts",
})
export class Workout extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type!: string; // Ejemplo: "Ciclismo", "Rodillo", "Carrera", etc.

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    distance!: number; // Km recorridos

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    duration!: number; // Minutos

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    averagePower!: number; // Potencia media en W

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxPower!: number; // Potencia máxima en W

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    calories!: number; // Calorías quemadas
}
