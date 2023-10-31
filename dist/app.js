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
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With'],
}));
// PUBLISHER API
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
// SUPERHERO API
// POST
const postSuperhero = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newSuperhero = new Superhero_1.Superhero(request.body);
    yield newSuperhero.save();
    response.send(newSuperhero);
});
// GET
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
// DELETE
const deleteSuperhero = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const superheroId = parseInt(request.params.id, 10);
        const superheroToDelete = yield Superhero_1.Superhero.findByPk(superheroId);
        if (!superheroToDelete) {
            return response.status(404).json({ error: 'Superhero not found' });
        }
        yield superheroToDelete.destroy();
        return response.status(204).send();
    }
    catch (error) {
        console.error('Error deleting superhero:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});
// ************** COMIC API ********************
// POST
const postComic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newComic = new Comic_1.Comic(request.body);
    yield newComic.save();
    response.send(newComic);
});
// GET
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
// DELETE
const deleteComic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comicId = parseInt(request.params.id, 10);
        const comicToDelete = yield Comic_1.Comic.findByPk(comicId);
        if (!comicToDelete) {
            return response.status(404).json({ error: 'Comic not found' });
        }
        yield comicToDelete.destroy();
        return response.status(204).send();
    }
    catch (error) {
        console.error('Error deleting comic:', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
});
// POST
app.post('/api/publishers', postPublisher);
app.post('/api/superheroes', postSuperhero);
app.post('/api/comics', postComic);
// GET
app.get('/api/publishers', queryPublisher);
app.get('/api/superheroes', querySuperhero);
app.get('/api/comics', queryComic);
// DELETE
app.delete('/api/publishers/:id', deletePublisher);
app.delete('/api/superheroes/:id', deleteSuperhero);
app.delete('/api/comics/:id', deleteComic);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map