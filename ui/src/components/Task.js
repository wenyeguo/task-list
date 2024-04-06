// import { Button } from "@mui/base";
// import { Checkbox, Typography } from "@mui/material";
// import React, { useState } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { UpdateTaskForm } from "./UpdateTaskForm";
// import classnames from "classnames";
// import axios from "axios";
// import { API_URL } from "../utils";

// // component that rendered everytime we want display task
// // name,
// export const Task = ({ task, fetchTasks }) => {
//   const { id, name, completed } = task;
//   const [isCompleted, setIsCompleted] = useState(completed);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const handelUpdateTaskCompletion = async () => {
//     try {
//       await axios.put(API_URL, {
//         id,
//         name,
//         completed: !isCompleted,
//       });
//       setIsCompleted((prev) => !prev);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const handleDeleteTask = async () => {
//     try {
//       await axios.delete(`${API_URL}/${task.id}`);
//       await fetchTasks();
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="task">
//       <div className={classnames("flex", { done: isCompleted })}>
//         <Checkbox checked={isCompleted} onChange={handelUpdateTaskCompletion} />
//         <Typography variant="h4">{name}</Typography>
//       </div>
//       <div className="taskButtons">
//         <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
//           <EditIcon />
//         </Button>
//         <Button color="error" variant="contained" onClick={handleDeleteTask}>
//           <DeleteIcon />
//         </Button>
//       </div>

//       <UpdateTaskForm
//         fetchTasks={fetchTasks}
//         isDialogOpen={isDialogOpen}
//         setIsDialogOpen={setIsDialogOpen}
//         task={task}
//       />
//     </div>
//   );
// };
import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";
import axios from "axios";
import { API_URL } from "../utils";

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });
      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);

      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task">
      <div
        className={classnames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  );
};