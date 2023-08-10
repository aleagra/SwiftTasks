import { TodoId, type Todo as TodoType } from "../types";
import styles from "../styles/components/_todo.module.scss";
import CruzIcon from "../assets/icons/CruzIcon";

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
  date,
  completed,
  handleRemove,
  completedTodo,
}) => {
  return (
    <div className={styles.todo}>
      <input
        type="checkbox"
        checked={completed}
        onChange={(event) => {
          completedTodo({ id, completed: event.target.checked });
        }}
      />
      <label htmlFor="">{title}</label>
      <p>{date}</p>
      <button
        className="destroy"
        onClick={() => {
          handleRemove({ id });
        }}
      >
        <CruzIcon />
      </button>
    </div>
  );
};

export default Todo;
