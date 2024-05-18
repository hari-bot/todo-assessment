import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleCompleted, deleteTodo, editTodo }) => {
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
            editTodo={editTodo}
          />
        ))}
    </ul>
  );
};

export default TodoList;
