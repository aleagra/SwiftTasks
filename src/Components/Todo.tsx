import { type Todo as TodoType } from "../types";

type Props = TodoType;

export const Todo: React.FC<Props> = ({ id, title, completed }) => {
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={() => {}} />
      <label htmlFor="">{title}</label>
      <button className="destroy" onClick={() => {}}></button>
    </div>
  );
};

export default Todo;
