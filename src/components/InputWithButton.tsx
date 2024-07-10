import React from "react";
import Input from "./Input";
import Button from "./Button";

type Props = {
  placeholderValue: string;
  buttonName: string;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addValue: (value: string) => () => void;
};

const InputWithButton = ({
  value,
  onValueChange,
  addValue,
  placeholderValue,
  buttonName,
}: Props) => {
  return (
    <div className="flex gap-x-2 w-full">
      <Input
        placeholderValue={placeholderValue}
        value={value}
        onValueChange={onValueChange}
      />
      <Button
        onClick={addValue(value)}
      >
        {buttonName}
      </Button>
    </div>
  );
};

export default InputWithButton;
