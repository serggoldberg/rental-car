"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import css from "./Select.module.css";

interface SelectProps {
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <div className={css.wrapper}>
      <label className={css.label}>{label}</label>
      <div className={css.select} onClick={() => setIsOpen(!isOpen)}>
        <span className={value ? css.value : css.placeholder}>
          {selectedLabel || placeholder}
        </span>
        {isOpen ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
      </div>
      {isOpen && (
        <ul className={css.dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${css.option} ${value === option.value ? css.active : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
