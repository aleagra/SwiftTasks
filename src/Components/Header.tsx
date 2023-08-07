import { CreateTodo } from "./CreateTodo";
import styles from "../styles/components/_header.module.scss";
import img from "../../public/tasks.png";

interface Props {
  saveTodo: (title: string) => void;
}

export const Header: React.FC<Props> = ({ saveTodo }) => {
  return (
    <header className={styles.header}>
      <img src={img} alt="" />

      <CreateTodo saveTodo={saveTodo} />
    </header>
  );
};
