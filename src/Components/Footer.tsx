import { FilterValue } from "../types";
import { Filters } from "./Filters";
import styles from "../styles/components/_footer.module.scss";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  handleFilterChange: (filter: FilterValue) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount,
  filterSelected,
  handleFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className={styles.footer}>
      <span className={styles.count}>
        <strong className={styles.number}>{activeCount}</strong>tareas
        pendientes
      </span>
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {completedCount > 0 && (
        <button className={styles.clear} onClick={onClearCompleted}>
          Borrar completados
        </button>
      )}
    </footer>
  );
};
