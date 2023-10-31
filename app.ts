
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import { Publisher } from './models/Publisher';
import { Superhero } from './models/Superhero';
import { Comic } from './models/Comic';
import cors from 'cors'; 


dotenv.config();


const app: Express = express();

// const port = 5000;

const corsOptions = {
  origin: "https://ts-comicshop-react.vercel.app/",  // or your exact URL you allow to make request
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
  credentials: true,
  preflightContinue:false
}

//...
app.use(cors(corsOptions))

const port: number = parseInt(process.env.PORT || '3000');
// PUBLISHER API
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

// SUPERHERO API

// POST
const postSuperhero = async (request: Request, response: Response) =>{
  const newSuperhero = new Superhero(request.body);
  await newSuperhero.save();
  response.send(newSuperhero)
}

// GET
const querySuperhero = async (request: Request, response: Response) => {
  try {
      const superheros = await Superhero.findAll();
      response.send(superheros)
  } catch (error) {
      console.error("Error querying superheros:", error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE
const deleteSuperhero = async (request: Request, response: Response) => {
  try {
    const superheroId = parseInt(request.params.id, 10); 
    const superheroToDelete = await Superhero.findByPk(superheroId);

    if (!superheroToDelete) {
      return response.status(404).json({ error: 'Superhero not found' });
    }

    await superheroToDelete.destroy();
    return response.status(204).send(); 
  } catch (error) {
    console.error('Error deleting superhero:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};


// ************** COMIC API ********************

// POST
const postComic = async (request: Request, response: Response) => {
  const newComic = new Comic(request.body);
  await newComic.save();
  response.send(newComic)
}

// GET
const queryComic = async (request: Request, response: Response) => {
    try {
        const comics = await Comic.findAll();
        response.send(comics)
    } catch (error) {
        console.error("Error querying publishers:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};

// DELETE
const deleteComic = async (request: Request, response: Response) => {
  try {
    const comicId = parseInt(request.params.id, 10); 
    const comicToDelete = await Comic.findByPk(comicId);

    if (!comicToDelete) {
      return response.status(404).json({ error: 'Comic not found' });
    }

    await comicToDelete.destroy();
    return response.status(204).send(); 
  } catch (error) {
    console.error('Error deleting comic:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST
app.post('/api/publishers', postPublisher)
app.post('/api/superheroes', postSuperhero)
app.post('/api/comics', postComic)

// GET
app.get('/api/publishers', queryPublisher)
app.get('/api/superheroes', querySuperhero)
app.get('/api/comics', queryComic)


// DELETE
app.delete('/api/publishers/:id', deletePublisher)
app.delete('/api/superheroes/:id', deleteSuperhero)
app.delete('/api/comics/:id', deleteComic)


app.listen(port, () => {
  console.log(`RUNNING ON PORT ${port}` )
})

export default app;