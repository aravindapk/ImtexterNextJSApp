// components/Dropdown.tsx
import { ChangeEvent } from 'react';

interface DropdownProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <>
    <label>Show Images per page </label>
    <select
     name= "select shown images"
      value={value}
      onChange={handleChange}
      className="px-4 py-2 border rounded-md"
    >
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    </>
  );
};

export default Dropdown;
