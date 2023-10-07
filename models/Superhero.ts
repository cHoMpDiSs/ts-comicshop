
import { DataTypes, Model } from 'sequelize'; 
import { Publisher } from './Publisher';
import sequelize from "../sequelize"


class Superhero extends Model {
    public id!: number;
    public name!: string;
    public publisherId!: number;
    
}

Superhero.init(
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
        publisherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Publisher, 
                key: 'id',
            },
    }
},
    {
        sequelize, 
        modelName: 'Superhero', 
        tableName: 'superheroes', 
    }
    
    );




Superhero.belongsTo(Publisher,{
    foreignKey: 'publisherId',
    constraints: false
});

sequelize.sync({ force: false }); 

export { Superhero };