import { useState } from "react";
import { Todos } from "./Components/Todos";

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
  ];

  const [todos, setTodos] = useState(todosList);

  return (
    <div className="container">
      <Todos todos={todos} />
    </div>
  );
};

export default App;
