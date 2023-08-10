import { useEffect, useState } from "react";
import { Todos } from "./Components/Todos";
import { FilterValue, Todo, TodoId } from "./types";
import { TODO_FILTERS } from "./const";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import styles from "./styles/components/_main.module.scss";
import { fetchTodos } from "./services/todos";
import { updateDatabase } from "./services/fetch";

const App: React.FC = () => {
  const todosList: any[] | (() => any[]) = [];

  const [todos, setTodos] = useState(todosList);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  useEffect(() => {
    fetchTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleRemove = async ({ id }: TodoId): Promise<void> => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    await updateDatabase(newTodos);
  };

  const handleCompleted = async ({
    id,
    completed,
  }: Pick<Todo, "id" | "completed">): Promise<void> => {
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
    await updateDatabase(newTodos);
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

  const handleRemoveCompleted = async (): Promise<void> => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    await updateDatabase(newTodos);
  };
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const combinedDateTime = currentDate + " " + currentTime;
  const handleSave = async (title: string): Promise<void> => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      date: combinedDateTime,
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    await updateDatabase(updatedTodos);
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
