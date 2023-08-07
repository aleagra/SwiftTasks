import { useState } from "react";
import { Todos } from "./Components/Todos";
import { FilterValue, Todo, TodoId } from "./types";
import { TODO_FILTERS } from "./const";
import { Footer } from "./Components/Footer";

const App: React.FC = () => {
  const todosList = [
    {
      id: "1",
      title: "tarea 1",
      completed: false,
    },
    {
      id: "2",
      title: "tarea 2",
      completed: false,
    },
    {
      id: "3",
      title: "tarea 3",
      completed: false,
    },
    {
      id: "4",
      title: "tarea 4",
      completed: false,
    },
    {
      id: "5",
      title: "tarea 5",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState(todosList);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const handleCompleted = ({
    id,
    completed,
  }: Pick<Todo, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filterTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const handleRemoveCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };
  return (
    <div className="container">
      <Todos
        todos={filterTodos}
        handleRemove={handleRemove}
        completedTodo={handleCompleted}
      />
      <Footer
        onClearCompleted={handleRemoveCompleted}
        completedCount={completedCount}
        filterSelected={filterSelected}
        activeCount={todos.filter((todo) => !todo.completed).length}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
