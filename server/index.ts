import express, { urlencoded, json } from "express";
import cors from "cors";
import { Pool } from 'pg';
import { createWidget } from './services/create-widget/createWidget'
import { getWidgets } from "./services/get-widgets/getWidgets";
import { deleteWidget } from "./services/delete-widget/deleteWidget";

const port = process.env.PORT;
const app = express();

app.use(urlencoded({ extended: true }),   
cors({
  origin: ["http://localhost:5173", `${process.env.DATABASE_URL}`],
  methods: ['GET', 'POST'],
  credentials: true,
}));
app.use(json());

// const pool = new Pool({
//   user: 'postgres',          
//   host: 'localhost',       
//   database: 'postgres',     
//   password: 'trumpet', 
//   port: 5432,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then((client: { release: () => void; }) => {
    console.log('connected to db');
    client.release();
  })
  .catch((err: unknown) => {
    if(err instanceof Error){
      console.error('error connecting to db', err.message);
    }
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.get("/widgets", async (req, res) => {
  try{
    const result = await getWidgets(pool);

    res.status(200).json({
      widgets: result || []
    });
  }catch(error){
     if(error && error instanceof Error){
      console.error(`Something went wrong getting widgets. ${error.message}`);
    }
    res.status(500).json({ error: "Something went wrong getting widgets" });
  }
  
});

app.post("/create-widget", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: "Content is required." });
  }

  try {
    const newWidget = await createWidget(pool, content);
    res.status(201).json({
      widget: newWidget
    });
  } catch (error: unknown) {
    if(error && error instanceof Error){
      console.error(`Something went wrong creating widgets. ${error.message}`);
    }
    res.status(500).json({ error: "Something went wrong creating widgets" });
  }
});

app.post("/delete-widget", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedItem = await deleteWidget(pool, id);
    res.status(200).json({ deletedId: deletedItem[0].id });
  } catch (error: unknown) {
    if(error && error instanceof Error){
      console.error(`Something went wrong deleting widget. ${error.message}`);
    }
    res.status(500).json({ error: "Something went wrong deleting widget" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
