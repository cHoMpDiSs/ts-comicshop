// main.ts

import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import { Publisher } from './models/Publisher';
import { Superhero } from './models/Superhero';

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



const queryPublisher = async (request: Request, response: Response) => {
    try {
        const publishers = await Publisher.findAll();
        response.send(publishers)
    } catch (error) {
        console.error("Error querying publishers:", error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
};


const querySuperhero = async (request: Request, response: Response) => {
  try {
      const superheros = await Superhero.findAll();
      response.send(superheros)
  } catch (error) {
      console.error("Error querying superheros:", error);
      response.status(500).json({ error: 'Internal Server Error' });
  }
};


app.get('/api/publishers', queryPublisher)
app.get('/api/superheros', querySuperhero)





app.listen(port, () => {
  console.log(`RUNNING ON PORT ${port}` )
})