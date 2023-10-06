"use strict";
// main.ts
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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Publisher_1 = require("./models/Publisher");
const Superhero_1 = require("./models/Superhero");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
const queryPublisher = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publishers = yield Publisher_1.Publisher.findAll();
        response.send(publishers);
    }
    catch (error) {
        console.error("Error querying publishers:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
const querySuperhero = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superheros = yield Superhero_1.Superhero.findAll();
        response.send(superheros);
    }
    catch (error) {
        console.error("Error querying superheros:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/publishers', queryPublisher);
app.get('/api/superheros', querySuperhero);
app.listen(port, () => {
    console.log(`RUNNING ON PORT ${port}`);
});
