import express, { urlencoded, json } from "express";
import cors from "cors";

// import { createWidget } from "../services/create-widget/createWidget";
const port = process.env.PORT || 8000;
const app = express();




app.use(urlencoded({ extended: true }),   
cors({
  origin: ["http://localhost:5173",],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.get("/widgets", (req, res) => {

  const id = Math.random() + 22
  
  res.status(200).json({ widgets: [ { id: Math.floor(id), content: 'Widget content 123' }]  });
});

app.post("/create-widget", (req, res) => {

  const onSuccess = true

  const content = req.body

  // const data = createWidget(content, onSuccess)

  res.status(200).json({ widgets: [] });
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});