import { TodoId, type Todo as TodoType } from "../types";
import styles from "../styles/components/_variables.module.scss";

interface Props extends TodoType {
  handleRemove: ({ id }: TodoId) => void;
  completedTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  handleRemove,
  completedTodo,
}) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(event) => {
          completedTodo({ id, completed: event.target.checked });
        }}
      />
      <label htmlFor="">{title}</label>
      <button
        className="destroy"
        onClick={() => {
          handleRemove({ id });
        }}
      ></button>
    </div>
  );
};

export default Todo;
