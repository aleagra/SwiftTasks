import { useState } from "react";
import { Todos } from "./Components/Todos";
import { Todo, TodoId } from "./types";

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

  return (
    <div className="container">
      <Todos
        todos={todos}
        handleRemove={handleRemove}
        completedTodo={handleCompleted}
      />
    </div>
  );
};

export default App;
