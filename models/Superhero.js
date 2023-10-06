"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Superhero = void 0;
const sequelize_1 = require("sequelize");
const Publisher_1 = require("./Publisher");
const sequelize = new sequelize_1.Sequelize({
    define: {
        timestamps: false,
    },
    dialect: 'postgres',
    username: 'postgres',
    host: 'comicshop.c8da90fz6lfx.us-east-1.rds.amazonaws.com',
    database: 'comicshop',
    password: 'admin123',
});
class Superhero extends sequelize_1.Model {
    static associate(models) {
        Superhero.belongsTo(models.Publisher, {
            foreignKey: 'publisherId',
            as: 'publisher', // This sets an alias for the association
        });
    }
}
exports.Superhero = Superhero;
Superhero.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    publisherId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Publisher',
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Superhero',
    tableName: 'superheros',
});
Superhero.belongsTo(Publisher_1.Publisher, { foreignKey: 'publisherId', as: 'publisher' });
sequelize.sync({ force: false });
