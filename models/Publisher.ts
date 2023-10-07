
import {DataTypes, Model } from 'sequelize'; 
import sequelize from "../sequelize"



class Publisher extends Model {
    public id!: number;
    public name!: string;
    public address!: string;
    public city!: string;

}


Publisher.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    
    {
        sequelize, 
        modelName: 'Publisher', 
        tableName: 'publishers', 
    }
);



sequelize.sync({ force: false }); 


export { Publisher };
