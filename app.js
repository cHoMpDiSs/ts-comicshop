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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const Publisher_1 = require("./models/Publisher");
const Superhero_1 = require("./models/Superhero");
const Comic_1 = require("./models/Comic");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
const postPublisher = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newPublisher = new Publisher_1.Publisher(request.body);
    yield newPublisher.save();
    response.send(newPublisher);
});
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
const deletePublisher = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publisherId = parseInt(request.params.id, 10);
        const publisherToDelete = yield Publisher_1.Publisher.findByPk(publisherId);
        if (!publisherToDelete) {
            return response.status(404).json({ error: 'Publisher not found' });
        }
        yield publisherToDelete.destroy();
        return response.status(204).send();
    }
    catch (error) {
        console.error('Error deleting publisher:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});
const postSuperhero = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newSuperhero = new Superhero_1.Superhero(request.body);
    yield newSuperhero.save();
    response.send(newSuperhero);
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
const postComic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newComic = new Comic_1.Comic(request.body);
    yield newComic.save();
    response.send(newComic);
});
const queryComic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comics = yield Comic_1.Comic.findAll();
        response.send(comics);
    }
    catch (error) {
        console.error("Error querying publishers:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET
app.get('/api/publishers', queryPublisher);
app.get('/api/superheros', querySuperhero);
app.get('/api/comics', queryComic);
// POST
app.post('/api/publishers', postPublisher);
app.post('/api/superheros', postSuperhero);
app.post('/api/comics', postComic);
// DELETE
app.delete('/api/publishers/:id', deletePublisher);
app.listen(port, () => {
    console.log(`RUNNING ON PORT ${port}`);
});
