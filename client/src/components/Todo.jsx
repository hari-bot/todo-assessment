import TodoList from "./TodoList";
const Todo = () => {
  return (
    <div className="max-w-4xl mx-auto sm:mt-8 mt-8 p-4 bg-gray-100 rounded">
      <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">
        Personal TODO APP
      </h2>
      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          // value={newTodoText}
          // onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          // onClick={handleAddTodoClick}
        >
          {/* <BsPlus size={20} /> */} Add +
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* <FilterButtons /> */}Filter Button
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            //   value={searchTerm}
            //   onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            {/* <BsSearch size={20} /> */} Search
          </button>
        </div>
      </div>
      <TodoList />
    </div>
  );
};

export default Todo;
