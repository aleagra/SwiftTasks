import { TodoId, type Todo as TodoType } from "../types";
import styles from "../styles/components/_todo.module.scss";
import ElipsisIcon from "../assets/icons/EllipsisIcon";
import Dropdown from "./Dropdown";
import Check from "../assets/icons/Check";

interface Props extends TodoType {
  handleRemove: ({ id }: TodoId) => void;
  completedTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

const options = [
  { value: "Eliminar", label: "Eliminar" },
  { value: "Completar", label: "Completar" },
  { value: "Editar", label: "Editar" },
];
export const Todo: React.FC<Props> = ({
  id,
  title,
  date,
  completed,
  handleRemove,
  completedTodo,
}) => {
  const todoClasses = `${styles.todo} ${completed ? styles.completedTodo : ""}`;
  const handleOptionSelect = (selectedValue: string) => {
    switch (selectedValue) {
      case "Eliminar":
        handleRemove({ id });
        break;
      case "Completar":
        completedTodo({ id, completed: !completed });
        break;
      case "Editar":
        console.log("Selected Option 3");
        break;
      default:
        break;
    }
  };
  return (
    <div className={todoClasses}>
      <div className={styles.check}>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.containerTodo}>
        <label htmlFor="">{title}</label>
        <h2>Jhon Doe from TechX compañy...</h2>
        <div className={styles.dates}>
          <p>{date}</p>
        </div>
      </div>
      <label className={styles.customCheckbox}>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          checked={completed}
          onChange={(event) => {
            completedTodo({ id, completed: event.target.checked });
          }}
        />
        <Check />
      </label>

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
