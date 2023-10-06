"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const sequelize_1 = require("sequelize");
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
class Publisher extends sequelize_1.Model {
}
exports.Publisher = Publisher;
Publisher.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Publisher',
    tableName: 'publishers',
});
sequelize.sync({ force: false });
