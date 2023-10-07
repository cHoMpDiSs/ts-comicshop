
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import { Publisher } from './models/Publisher';
import { Superhero } from './models/Superhero';
import { Comic } from './models/Comic';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const postPublisher = async (request: Request, response: Response) => {
  const newPublisher = new Publisher(request.body);
  await newPublisher.save();
  response.send(newPublisher)
}

const queryPublisher = async (request: Request, response: Response) => {
    try {
        const publishers = await Publisher.findAll();
        response.send(publishers)
    } catch (error) {
        console.error("Error querying publishers:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePublisher = async (request: Request, response: Response) => {
  try {
    const publisherId = parseInt(request.params.id, 10); 
    const publisherToDelete = await Publisher.findByPk(publisherId);

    if (!publisherToDelete) {
      return response.status(404).json({ error: 'Publisher not found' });
    }

    await publisherToDelete.destroy();
    return response.status(204).send(); 
  } catch (error) {
    console.error('Error deleting publisher:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

const postSuperhero = async (request: Request, response: Response) =>{
  const newSuperhero = new Superhero(request.body);
  await newSuperhero.save();
  response.send(newSuperhero)
}

const querySuperhero = async (request: Request, response: Response) => {
  try {
      const superheros = await Superhero.findAll();
      response.send(superheros)
  } catch (error) {
      console.error("Error querying superheros:", error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
};


const postComic = async (request: Request, response: Response) => {
  const newComic = new Comic(request.body);
  await newComic.save();
  response.send(newComic)
}

const queryComic = async (request: Request, response: Response) => {
    try {
        const comics = await Comic.findAll();
        response.send(comics)
    } catch (error) {
        console.error("Error querying publishers:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};


// GET
app.get('/api/publishers', queryPublisher)
app.get('/api/superheros', querySuperhero)
app.get('/api/comics', queryComic)

// POST
app.post('/api/publishers', postPublisher)
app.post('/api/superheros', postSuperhero)
app.post('/api/comics', postComic)


// DELETE
app.delete('/api/publishers/:id', deletePublisher)



app.listen(port, () => {
  console.log(`RUNNING ON PORT ${port}` )
})