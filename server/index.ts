import express from 'express';
import DbAccess from './src/data-access'
const app = express();
const port = 80;

app.get("/api", async (req, res) => {
  const db = await DbAccess.connection.collection('tickets').findOne();

  // const ret = await db.collection('tickets').findOne();
  // console.log(ret);
  res.send("Hello World!" + JSON.stringify(db));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
