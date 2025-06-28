import express, { urlencoded, json } from "express";
import cors from "cors";
import { Pool } from 'pg';
import { createWidget } from './services/create-widget/createWidget.ts'
const port = process.env.PORT || 3000;
const app = express();

app.use(urlencoded({ extended: true }),   
cors({
  origin: ["http://localhost:5173",],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(json());

const pool = new Pool({
  user: 'postgres',          
  host: 'localhost',       
  database: 'postgres',     
  password: 'trumpet', 
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log('connected to db');
    client.release();
  })
  .catch(err => {
    console.error('error connecting to db', err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.get("/widgets", (req, res) => {

  const id = Math.random() + 22
  
  res.status(200).json({ widgets: [ { id: Math.floor(id), content: 'Widget content 123' }]  });
});

app.post("/create-widget", async (req, res) => {
  const { content } = req.body;

  // if (!content) {
  //   return res.status(400).json({ error: "Content is required." });
  // }

  try {
    const newWidget = await createWidget(pool, content);
    res.status(201).json({
      widget: newWidget
    });
  } catch (error: any) {
    console.error("Error creating widget:", error.message);
    res.status(500).json({ error: "Failed to create widget" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
