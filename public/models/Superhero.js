"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Superhero = void 0;
const sequelize_1 = require("sequelize");
const Publisher_1 = require("./Publisher");
const sequelize_2 = __importDefault(require("../sequelize"));
class Superhero extends sequelize_1.Model {
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
            model: Publisher_1.Publisher,
            key: 'id',
        },
    }
}, {
    sequelize: sequelize_2.default,
    modelName: 'Superhero',
    tableName: 'superheroes',
});
Superhero.belongsTo(Publisher_1.Publisher, {
    foreignKey: 'publisherId',
    constraints: false
});
sequelize_2.default.sync({ force: false });
//# sourceMappingURL=Superhero.js.map