import { useState } from "react";
import { Todos } from "./Components/Todos";
import { FilterValue, Todo, TodoId } from "./types";
import { TODO_FILTERS } from "./const";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import styles from "./styles/components/_main.module.scss";

const App: React.FC = () => {
  const todosList = [
    {
      id: "1",
      title: "Pasear al perro",
      completed: false,
    },
    {
      id: "2",
      title: "Parcial",
      completed: false,
    },
    {
      id: "3",
      title: "Sacar turno",
      completed: false,
    },
    {
      id: "4",
      title: "Terminar Frontend",
      completed: false,
    },
    {
      id: "5",
      title: "Hostear app",
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

  const handleSave = (title: string): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className={styles.main}>
      <Header saveTodo={handleSave} />
      <Footer
        onClearCompleted={handleRemoveCompleted}
        completedCount={completedCount}
        filterSelected={filterSelected}
        activeCount={todos.filter((todo) => !todo.completed).length}
        handleFilterChange={handleFilterChange}
      />
      <Todos
        todos={filterTodos}
        handleRemove={handleRemove}
        completedTodo={handleCompleted}
      />
    </div>
  );
};

export default App;
