"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() {
        this.connectToDatabase();
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sequelize = new sequelize_typescript_1.Sequelize({
                define: {
                    timestamps: false,
                },
                dialect: 'postgres',
                username: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
            });
            yield this.sequelize
                .authenticate()
                .then(() => {
                console.log("Connection has been established successfully.");
            })
                .catch((err) => {
                console.error("Unable to connect to the Database:", err);
            });
        });
    }
}
;
exports.default = Database;
//# sourceMappingURL=Database.js.map