import TodoItem from "./TodoItem";
import { Reorder } from "framer-motion";

const TodoList = ({
  todos,
  toggleCompleted,
  deleteTodo,
  editTodo,
  setTodos,
}) => {
  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      <Reorder.Group values={todos} onReorder={setTodos} axis="y">
        {todos &&
          todos.map((todo, index) => (
            <Reorder.Item value={todo} key={index}>
              <TodoItem
                todo={todo}
                index={index}
                toggleCompleted={toggleCompleted}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
              />
            </Reorder.Item>
          ))}
      </Reorder.Group>
    </ul>
  );
};

export default TodoList;
