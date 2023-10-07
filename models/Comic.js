"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comic = void 0;
const sequelize_1 = require("sequelize");
const Publisher_1 = require("./Publisher");
const Superhero_1 = require("./Superhero");
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
class Comic extends sequelize_1.Model {
}
exports.Comic = Comic;
Comic.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    series: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    issue: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    publisherId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Publisher_1.Publisher,
            key: 'id',
        },
    },
    superHeroId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Superhero_1.Superhero,
            key: 'id',
        },
    }
}, {
    sequelize,
    modelName: 'Comic',
    tableName: 'comics',
});
Comic.belongsTo(Publisher_1.Publisher, {
    foreignKey: 'publisherId',
    constraints: false
});
Comic.belongsTo(Superhero_1.Superhero, {
    foreignKey: 'superHeroId',
    constraints: false
});
sequelize.sync({ force: false });
