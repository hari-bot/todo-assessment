import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleCompleted, deleteTodo }) => {
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
