import { CreateTodo } from "./CreateTodo";
import styles from "../styles/components/_header.module.scss";

interface Props {
  saveTodo: (title: string) => void;
}

export const Header: React.FC<Props> = ({ saveTodo }) => {
  return (
    <header className={styles.header}>
      <img src="./tasks.png" alt="" />

      <CreateTodo saveTodo={saveTodo} />
    </header>
  );
};
