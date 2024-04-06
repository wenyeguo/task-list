import express from "express";
import {fetchTasks, createTasks, updateTasks, deleteTasks} from "./task.js";
import serverless from "serverless-http";
// last allow cores, only if run locally
import cors from "cors"
const app = express();
const port = 3001;

// middleware
app.use(express.json());

if (process.env.DEVELOPMENT){
    app.use(cors());
}
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/task", async (req, res) => {
  try {
    const tasks = await fetchTasks();
    res.send(tasks.Items)
  } catch(err){
    res.status(400).send(`Error Fetching Tasks: ${err}`);
  }
});

// create data
app.post("/task", async (req, res) => {
    try {
        const task = req.body;
        const response = await createTasks(task);
        res.send(response)
      } catch(err){
        res.status(400).send(`Error Creating Tasks: ${err}`);
      }
});

//   update
app.put("/task", async (req, res) => {
    try {
        const task = req.body;
        const response = await updateTasks(task);
        res.send(response)
      } catch(err){
        res.status(400).send(`Error Update Tasks: ${err}`);
      }
});

//   delete
app.delete("/task/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const response = await deleteTasks(id);
        res.send(response)
      } catch(err){
        res.status(400).send(`Error Delete Tasks: ${err}`);
      }
});


// if run locally, still want to use app listen. RUn using npm dev
if (process.env.DEVELOPMENT){
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
}

// deploy it using npm start in serverless
export const handler = serverless(app);
