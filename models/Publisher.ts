
import { Sequelize, DataTypes, Model } from 'sequelize'; 


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
