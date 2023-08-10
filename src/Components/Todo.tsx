import { TodoId, type Todo as TodoType } from "../types";
import styles from "../styles/components/_todo.module.scss";
import CruzIcon from "../assets/icons/CruzIcon";
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
