import { TodoId, type Todo as TodoType } from "../types";
import styles from "../styles/components/_todo.module.scss";
import ElipsisIcon from "../assets/icons/EllipsisIcon";
import Dropdown from "./Dropdown";

interface Props extends TodoType {
  handleRemove: ({ id }: TodoId) => void;
  completedTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

const options = [
  { value: "option1", label: "Opción 1" },
  { value: "option2", label: "Opción 2" },
  { value: "option3", label: "Opción 3" },
];

const handleOptionSelect = (selectedValue: string) => {
  console.log(`Seleccionaste: ${selectedValue}`);
};

export const Todo: React.FC<Props> = ({
  id,
  title,
  date,
  completed,
  handleRemove,
  completedTodo,
}) => {
  const todoClasses = `${styles.todo} ${completed ? styles.completedTodo : ""}`;

  return (
    <div className={todoClasses}>
      <label htmlFor="">{title}</label>
      <div className={styles.dates}>
        <p>{date}</p>
        <input
          type="checkbox"
          className={styles.customCheckbox}
          checked={completed}
          onChange={(event) => {
            completedTodo({ id, completed: event.target.checked });
          }}
        />
      </div>

      {/* <button
        className="destroy"
        onClick={() => {
          handleRemove({ id });
        }}
      >
        <ElipsisIcon />
      </button> */}

      <Dropdown options={options} onSelect={handleOptionSelect} />
    </div>
  );
};

export default Todo;
