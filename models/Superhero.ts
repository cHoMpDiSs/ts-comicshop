
import { Sequelize, DataTypes, Model } from 'sequelize'; 
import { Publisher } from './Publisher';

const sequelize = new Sequelize({
    define: {
        timestamps: false,
      },
    dialect: 'postgres', 
    username: 'postgres',
    host: 'comicshop.c8da90fz6lfx.us-east-1.rds.amazonaws.com',
    database: 'comicshop',
    password: 'admin123',
  
});


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
        tableName: 'superheros', 
    }
    
    );




Superhero.belongsTo(Publisher,{
    foreignKey: 'publisherId',
    constraints: false
});

sequelize.sync({ force: false }); 

export { Superhero };