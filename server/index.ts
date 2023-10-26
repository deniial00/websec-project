import express, { Request, Response } from 'express';
import { Collection, MongoClient } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Ticket } from './src/interfaces/ticket-interface';
import TicketController from './src/ticket-controller';
import AuthController from './src/auth-controller';
const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.json());


app.get("/api", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/ticket", async (req: Request, res: Response) => {
  let ticket: Ticket | undefined; 
  
  try {
    const uuid: string = req.params.uuid;
    
    if (uuid === null)
      throw Error(`Keine uuid übergeben`);
  
    ticket = await new TicketController().getTicket(uuid);

    if (ticket === undefined)
      throw Error(`Ticket mit uuid ${uuid} nicht gefunden`);
    
  } catch(error: unknown) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }

  res.json(ticket);
});

app.post('/api/ticket', async (req: Request, res: Response) => {
  try {
    const reqData: Ticket = req.body;
    await new TicketController().createTicket(reqData);
  } catch(error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
  res.json({ error: false });
})

app.get("/api/tickets", async (req: Request, res: Response) => {
  let ticket: Ticket[] | undefined; 

  try {
    ticket = await new TicketController().getTickets();
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }
  
  res.json(ticket);
});

app.post("/api/signup", async (req: Request, res: Response) => {
  try {
    console.log(req.body.data);
    await new AuthController().signup(req.body.data);
    const result = await new AuthController().login(req.body.data);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    console.log(req.body.data);
    const result = await new AuthController().login(req.body.data);
    console.log(result);
    res.status(200).json({ data: result });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
