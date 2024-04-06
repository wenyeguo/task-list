import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./components/AddTaskForm";
import { Task } from "./components/Task";
import axios from "axios";
// ?send HTTP request
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// const task = {
//   id: "1",
//   name:"do dishes",
//   completed: false
// }
export default function App() {
  // keep track of tasks
  const [tasks, setTasks] = useState([]);
  const fectchTasks = async () => {
    try {
      const { data } = await axios.get(); // url of api as parameter
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fectchTasks();
  }, []); // only call this function when the data first loaded

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fectchTasks={fectchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fectchTasks={fectchTasks} />
      ))}
    </ThemeProvider>
  );
}
