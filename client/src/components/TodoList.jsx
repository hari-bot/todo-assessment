import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [cookies] = useCookies(null);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      {todos &&
        todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
          />
        ))}
    </ul>
  );
};

export default TodoList;
