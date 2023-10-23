import express, { Request, Response } from 'Express';
import { Collection, MongoClient } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';


const authController = require('./src/auth-controller');
import DbAccess from './src/data-access'
import { Ticket } from './src/interfaces/ticket-interface';
import TicketController from './src/ticket-controller';
const app = express();
const port = 80;

app.use(cors());
app.use(bodyParser.json());

app.get("/api", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/ticket", async (req: Request, res: Response) => {
  const uuid: string = req.params.uuid;

  if (uuid === null)
    res.json({error: "Keine uuid übergeben"});

  // Also dass ich da ein await machen muss weil ich die func getTicket async machen 
  // musste (weil ich in der func ein await brauche, damit ich Tickets ansatt 
  // Promise<Ticket> returnen darf) find ich auch frech. 
  const ticket: Ticket = await new TicketController().getTicket(uuid);
  
  res.json(ticket);
});

app.post('/api/ticket', async (req: Request, res: Response) => {
  const response = { error: false };

  console.log(req);

  const reqData = req.body;
  console.log(reqData);

  res.json(response);
})

app.get("/api/tickets", async (req: Request, res: Response) => {
  const ticket: Ticket[] = await new TicketController().getTickets();
  
  res.json(ticket);
});



app.post("/api/signup", async (req: Request, res: Response) => {
  try {
    const result = await authController.signup(req.body.data);
    res.json({ status: result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  console.log("test");
  try {
    const result = await authController.login(req.body.data);
    res.json({ status: result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
