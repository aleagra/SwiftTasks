import {
  Todo as TodoType,
  TodoTitle,
  type ListOfTodos,
  TodoId,
} from "../types";
import Todo from "./Todo";

interface Props {
  todos: ListOfTodos;
  handleRemove: ({ id }: TodoId) => void;
  completedTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

export const Todos: React.FC<Props> = ({
  todos,
  handleRemove,
  completedTodo,
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li className={`${todo.completed} ? : `} key={todo.id}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            completedTodo={completedTodo}
            handleRemove={handleRemove}
          />
        </li>
      ))}
    </ul>
  );
};
