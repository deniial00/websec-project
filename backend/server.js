import express from "express";
import TicketController from "./src/ticket-controller";

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
  const c_ticket = new TicketController();
  const res1 = c_ticket.test();
  res.send("Hello World!"+res1);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
