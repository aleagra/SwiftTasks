import { Todo as TodoType, type ListOfTodos, TodoId } from "../types";
import Todo from "./Todo";
import styles from "../styles/components/_todos.module.scss";

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
    <ul className={styles.todos}>
      {todos.map((todo) => (
        <li className={styles.todo} key={todo.id}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            date={todo.date}
            completed={todo.completed}
            completedTodo={completedTodo}
            handleRemove={handleRemove}
          />
        </li>
      ))}
    </ul>
  );
};
