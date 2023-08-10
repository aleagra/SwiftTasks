import React, { useState, useRef, useEffect } from "react";
import ElipsisIcon from "../assets/icons/EllipsisIcon";
import styles from "../styles/components/_dropdown.module.scss";
interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setIsOpen(false); // Cerrar el dropdown al seleccionar una opción
    onSelect(option.value);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.toggle} onClick={toggleDropdown}>
        <ElipsisIcon />
      </button>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option)}
              className={styles.option}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
