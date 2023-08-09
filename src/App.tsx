import { useEffect, useState } from "react";
import { Todos } from "./Components/Todos";
import { FilterValue, Todo, TodoId } from "./types";
import { TODO_FILTERS } from "./const";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import styles from "./styles/components/_main.module.scss";
import { fetchTodos } from "./services/todos";

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

    const dataToUpdate = {
      todos: newTodos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      })),
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(dataToUpdate),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        console.error("Error updating todos in the database");
      } else {
        console.log("Todo removed successfully");
      }
    } catch (error) {
      console.error("Error while making the request:", error);
    }
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

  const API_URL = "https://api.jsonbin.io/v3/b/64d2703ab89b1e2299cd6ba3";
  const API_KEY =
    "$2b$10$Z70p58jJIg78ugHuanAAsuQI3ylvD7f1IAMvoBe8WLf5QU6xECBSS";

  const handleRemoveCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);

    const updatedData = newTodos.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      };
    });

    const dataToUpdate = {
      todos: updatedData,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(dataToUpdate),
    };

    fetch(API_URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };
  const handleSave = async (title: string): Promise<void> => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    const dataToUpdate = {
      todos: updatedTodos,
    };

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(dataToUpdate),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      if (!response.ok) {
        console.error("Error updating todos in the database");
        setTodos(todos);
      } else {
        console.log("Todo added successfully");
      }
    } catch (error) {
      console.error("Error while making the request:", error);
      setTodos(todos);
    }
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
