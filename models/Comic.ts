import { DataTypes, Model } from "sequelize";
import { Publisher } from "./Publisher";
import { Superhero} from "./Superhero";
import sequelize from "../sequelize"


class Comic extends Model {
    public id!: number;
    public series!: string;
    public issue!: number;
    public publisherId!: number;
    public superHeroId!: number;
    public imgUrl!: string;
}

Comic.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        series: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        issue:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        imgUrl:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        publisherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Publisher, 
                key: 'id',
            },
        },
        superHeroId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Superhero, 
                key: 'id',
            },
    }
        }, {
            sequelize, 
            modelName: 'Comic', 
            tableName: 'comics', 
        }
    )


Comic.belongsTo(Publisher,{
    foreignKey: 'publisherId',
    constraints: false
});

Comic.belongsTo(Superhero,{
    foreignKey: 'superHeroId',
    constraints: false
});

sequelize.sync({ force: false }); 

export {Comic};