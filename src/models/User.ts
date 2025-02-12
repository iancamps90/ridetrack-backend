import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "users",
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    profilePicture?: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    authProvider!: string; // Google, GitHub, Strava, etc.
}
