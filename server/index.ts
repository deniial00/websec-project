import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';


const authController = require('./src/auth-controller');
import DbAccess from './src/data-access'
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json())

app.get("/api", async (req, res) => {
  const db = await DbAccess.connection.collection('tickets').findOne();

  // const ret = await db.collection('tickets').findOne();
  // console.log(ret);
  res.send("Hello World!" + JSON.stringify(db));
});

app.post("/api/signup", async (req, res) => {
  try {
    const result = await authController.signup(req.body.data);
    res.json({ status: result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});

app.post("/api/login", async (req, res) => {
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
