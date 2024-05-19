import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import TodoList from "./TodoList";
import Form from "./Form";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [cookies] = useCookies(null);
  const [showForm, setShowForm] = useState(false);
  const [currentFilter, serCurrentFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const userID = cookies.userID;
  const apiUrl = "https://todo-assessment-api.onrender.com";

  const fetchData = async () => {
    try {
      const todosResponse = await fetch(`${apiUrl}/tasks/${userID}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookies.AuthToken}`,
        },
      });
      const todosData = await todosResponse.json();
      setTodos(todosData.data);
      setAllTodos(todosData.data);
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
          Authorization: `Bearer ${cookies.AuthToken}`,
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
          Authorization: `Bearer ${cookies.AuthToken}`,
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
        headers: {
          Authorization: `Bearer ${cookies.AuthToken}`,
        },
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
        headers: {
          Authorization: `Bearer ${cookies.AuthToken}`,
        },
      });
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleFilter = (filterBy) => {
    serCurrentFilter(filterBy);
    let filteredTodos = allTodos;

    if (filterBy === "Complete") {
      filteredTodos = allTodos.filter((todo) => todo.completed);
    } else if (filterBy === "Incomplete") {
      filteredTodos = allTodos.filter((todo) => !todo.completed);
    }

    const sortedTodos = sortTodosByDueDate(filteredTodos, sortOrder);
    setTodos(sortedTodos);
  };

  const sortTodosByDueDate = (todos, order) => {
    return todos.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const sortedTodos = sortTodosByDueDate(todos, sortOrder);
    setTodos(sortedTodos);
  }, [sortOrder, todos]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

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
          Add +
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex space-x-4 items-center">
          <select
            className="text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none"
            value={currentFilter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Complete">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>

          <button
            className="text-sm px-2 py-1 bg-purple-500 text-white rounded ml-2"
            onClick={() => toggleSortOrder()}
          >
            Sort by Due Date ({sortOrder === "asc" ? "Ascending" : "Descending"}
            )
          </button>
        </div>
      </div>
      <TodoList
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleShowForm={toggleShowForm}
        setTodos={setTodos}
      />
    </div>
  );
};

export default Todo;
