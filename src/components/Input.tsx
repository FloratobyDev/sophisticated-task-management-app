import React from "react";

type Props = {
  placeholderValue: string;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ placeholderValue, value, onValueChange, ...rest }: Props) => {
  return (
    <input
      autoFocus
      type="text"
      placeholder={placeholderValue}
      className="border rounded-md px-2 py-0.5 flex-1"
      value={value}
      onChange={onValueChange}
      {...rest}
    />
  );
};

export default Input;
