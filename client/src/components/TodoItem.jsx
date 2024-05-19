import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { IoReorderThree, IoTimeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Form from "./Form";
import { useState } from "react";

const TodoItem = ({ todo, toggleCompleted, deleteTodo, editTodo }) => {
  const [showForm, setShowForm] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getDateClass = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dueDate);

    if (date < today) {
      return "text-red-500";
    } else if (date.toDateString() === today.toDateString()) {
      return "text-yellow-500";
    } else {
      return "text-green-500";
    }
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      {showForm && (
        <Form editTodo={editTodo} onClose={toggleShowForm} todo={todo} />
      )}
      <div className="border-b-2 m-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-4">
          <div className="flex items-center">
            <span className="mr-4 text-gray-500">
              <IoReorderThree />
            </span>
            <span
              className={`mr-4 ${
                todo.completed ? "line-through text-gray-500" : "font-semibold"
              }`}
            >
              {todo.title}
            </span>
            <span
              className={`mr-1 text-sm ${getDateClass(
                todo.dueDate
              )} flex items-center flex-shrink-0`}
            >
              <IoTimeOutline />
              {formatDate(todo.dueDate)}
            </span>
          </div>
          <div className="space-x-3 ml-8 sm:block hidden">
            <button
              className="mr-1 text-sm text-blue-500 border border-blue-500   sm:px-2 px-1 py-1 rounded"
              onClick={toggleShowForm}
            >
              <MdEdit />
            </button>
            <button
              className="mr-1 text-sm text-red-500  sm:px-2 px-1 py-1 border border-red-500 rounded"
              onClick={() => deleteTodo(todo._id)}
            >
              <FaTrash />
            </button>
            {!todo.completed && (
              <button
                className="text-sm text-green-500  sm:px-2 px-1 py-1 border border-green-500 rounded"
                onClick={() => toggleCompleted(todo._id)}
              >
                <FaCheck />
              </button>
            )}
            {todo.completed && (
              <button
                className="text-sm text-yellow-500  sm:px-2 px-1 py-1 border border-yellow-500 rounded"
                onClick={() => toggleCompleted(todo._id)}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        <div className="text-gray-500 ml-8">{todo.description}</div>
        <div className="space-x-3 ml-8 my-2 sm:hidden block">
          <button
            className="mr-1 text-sm text-blue-500 border border-blue-500   sm:px-2 px-1 py-1 rounded"
            //   onClick={() => dispatch(toggleTodo(index))}
          >
            <MdEdit />
          </button>
          <button
            className="mr-1 text-sm text-red-500  sm:px-2 px-1 py-1 border border-red-500 rounded"
            onClick={() => deleteTodo(todo._id)}
          >
            <FaTrash />
          </button>
          {!todo.completed && (
            <button
              className="text-sm text-green-500  sm:px-2 px-1 py-1 border border-green-500 rounded"
              onClick={() => toggleCompleted(todo._id)}
            >
              <FaCheck />
            </button>
          )}
          {todo.completed && (
            <button
              className="text-sm text-yellow-500  sm:px-2 px-1 py-1 border border-yellow-500 rounded"
              onClick={() => toggleCompleted(todo._id)}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default TodoItem;
