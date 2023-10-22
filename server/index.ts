const express = require('express');
import { MongoClient } from 'mongodb';

const app = express();
const port = 80;

app.get("/api", async (req, res) => {
  const client: MongoClient = new MongoClient('mongodb://database:27017/websec');
  const db = client.db('websec');

  const ret = await db.collection('tickets').findOne();
  console.log(ret);
  res.send("Hello World!" + JSON.stringify(ret));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
