import React, { useState, useEffect } from 'react';
import '../App.css';  
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { Container, Box, Grid, Button, Typography, TextField } from '@mui/material';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTodo = () => {
    if (newTitle === "" || newDescription === "") {
      // If either field is empty, show error message
      setErrorMessage(
        "Please add a title and description before adding a task."
      );
    } else {
      // If both fields are filled, proceed with adding the task
      const newTodoItem = {
        title: newTitle,
        description: newDescription,
      };

      const updatedTodoArr = [...allTodos, newTodoItem];
      setTodos(updatedTodoArr);
      localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));

      // Reset the input fields after adding a new todo
      setNewTitle("");
      setNewDescription("");
      setErrorMessage(""); // Clear any previous error message
    }
  };

  const handleDeleteTodo = (index) => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = now.toLocaleString();

    const filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    const updatedCompletedArr = [...completedTodos, filteredItem];
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    const savedCompletedTodo = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  // editing a todo
  const handleEdit = (index, item) => {
    setCurrentEdit(index);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  // Update the todo after editing
  const handleUpdateToDo = () => {
    const updatedTodos = [...allTodos];
    updatedTodos[currentEdit] = {
      title: editTitle,
      description: editDescription,
    };

    setTodos(updatedTodos);
    localStorage.setItem("todolist", JSON.stringify(updatedTodos));
    setCurrentEdit(null);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        p: 4,
        backgroundColor: "#161b22",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom color="white">
        My Todo List
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="title"
              placeholder="Task Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{
                backgroundColor: "#0d1117",
                input: { color: "white" },
                "& .MuiInputBase-input::placeholder": {
                  color: "#AAB8C2",
                  opacity: 1,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="description"
              placeholder="Task Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              sx={{
                backgroundColor: "#0d1117",
                input: { color: "white" },
                "& .MuiInputBase-input::placeholder": {
                  color: "#AAB8C2",
                  opacity: 1,
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Display error message if any */}
        {errorMessage && (
          <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
            {errorMessage}
          </Typography>
        )}

        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0d1117", color: "white" }}
              onClick={handleAddTodo}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Add margin below Todo and Completed buttons */}
      <Box sx={{ mb: 4 }}>
        <Button
          className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
          onClick={() => setIsCompleteScreen(false)}
          sx={{ mr: 2, color: "white" }}
        >
          Todo
        </Button>
        <Button
          className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
          onClick={() => setIsCompleteScreen(true)}
          sx={{ color: "white" }}
        >
          Completed
        </Button>
      </Box>

      <Grid container spacing={2}>
        {isCompleteScreen === false
          ? allTodos.map((item, index) => (
              <Grid
                item
                xs={12}
                key={index}
                sx={{
                  backgroundColor: "#0d1117",
                  p: 2,
                  mb: 2,
                  borderRadius: "8px",
                }}
              >
                {/* Edit Mode: Show input fields */}
                {currentEdit === index ? (
                  <>
                    <TextField
                      fullWidth
                      placeholder="Edit Title"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      sx={{
                        backgroundColor: "#0d1117",
                        input: { color: "white" },
                        mb: 2,
                      }}
                    />
                    <TextField
                      fullWidth
                      placeholder="Edit Description"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      sx={{
                        backgroundColor: "#0d1117",
                        input: { color: "white" },
                        mb: 2,
                      }}
                    />
                    <Button
                      onClick={handleUpdateToDo}
                      sx={{ color: "#00e67a" }}
                    >
                      Update
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" color="white">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="white">
                      {item.description}
                    </Typography>
                    <Button
                      onClick={() => handleDeleteTodo(index)}
                      sx={{ color: "red" }}
                    >
                      <AiOutlineDelete />
                    </Button>
                    <Button
                      onClick={() => handleComplete(index)}
                      sx={{ color: "#00e67a" }}
                    >
                      <BsCheckLg />
                    </Button>
                    <Button
                      onClick={() => handleEdit(index, item)}
                      sx={{ color: "#00e67a" }}
                    >
                      <AiOutlineEdit />
                    </Button>
                  </>
                )}
              </Grid>
            ))
          : completedTodos.map((item, index) => (
              <Grid
                item
                xs={12}
                key={index}
                sx={{
                  backgroundColor: "#0d1117",
                  p: 2,
                  mb: 2,
                  borderRadius: "8px",
                }}
              >
                <Typography variant="h6" color="white">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="white">
                  Completed on: {item.completedOn}
                </Typography>
                <Button
                  onClick={() => handleDeleteCompletedTodo(index)}
                  sx={{ color: "red" }}
                >
                  <AiOutlineDelete />
                </Button>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default App;
