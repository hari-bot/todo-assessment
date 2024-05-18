import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import TodoList from "./TodoList";
import Form from "./Form";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [cookies] = useCookies(null);
  const [showForm, setShowForm] = useState(false);
  const userID = cookies.userID;
  const apiUrl = "http://localhost:3001";

  const fetchData = async () => {
    try {
      const todosResponse = await fetch(`${apiUrl}/tasks/${userID}`, {
        method: "GET",
      });
      const todosData = await todosResponse.json();
      setTodos(todosData.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTodo = async (values) => {
    try {
      await fetch(`${apiUrl}/tasks/${userID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const editTodo = async (values, todoID) => {
    try {
      await fetch(`${apiUrl}/tasks/${todoID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleCompleted = async (taskID) => {
    try {
      await fetch(`${apiUrl}/tasks/complete/${taskID}`, {
        method: "PATCH",
      });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (taskID) => {
    try {
      await fetch(`${apiUrl}/tasks/${taskID}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-w-4xl mx-auto sm:mt-8 mt-8 p-4 bg-gray-100 rounded">
      <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
        Personal TODO APP
      </h2>
      {showForm && <Form addTodo={addTodo} onClose={toggleShowForm} />}
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          onClick={toggleShowForm}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={toggleShowForm}
        >
          {/* <BsPlus size={20} /> */} Add +
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        Filter By
      </div>
      <TodoList
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleShowForm={toggleShowForm}
      />
    </div>
  );
};

export default Todo;
