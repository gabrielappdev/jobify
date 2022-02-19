import { MultiValue, OptionBase, Select } from "chakra-react-select";

interface Option extends OptionBase {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  value: any;
  placeholder: string;
  closeMenuOnSelect?: boolean;
  isClearable?: boolean;
  size?: "sm" | "md" | "lg";
  onChange: (newValues: MultiValue<any>) => void;
}

const MultiSelect = ({
  options = [],
  placeholder,
  closeMenuOnSelect = false,
  isClearable = true,
  size = "md",
  value,
  onChange,
}: MultiSelectProps) => {
  return (
    <Select
      isMulti
      placeholder={placeholder}
      options={options}
      closeMenuOnSelect={closeMenuOnSelect}
      isClearable={isClearable}
      size={size}
      onChange={onChange}
      value={value}
    />
  );
};

export default MultiSelect;
