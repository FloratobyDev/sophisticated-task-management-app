import { MouseEvent } from "react";
import Cancel01Icon from "../../icons/Cancel01Icon";
import { ChecklistType } from "../../types";

type Props = {
  checklistItem: ChecklistType;
  onChecklistRemove: () => void;
};

const ChecklistItem = ({ checklistItem, onChecklistRemove }: Props) => {
  const onChecklistStatusChange = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // add code here
  };

  return (
    <div
      className="flex justify-between bg-gray-100 rounded-md px-2 py-1 my-0.5 ml-6"
      key={checklistItem.id}
      onClick={onChecklistStatusChange}
    >
      <div className="flex gap-x-2">
        <input type="checkbox" />
        <p>{checklistItem.description}</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChecklistRemove();
        }}
      >
        <Cancel01Icon />
      </button>
    </div>
  );
};

export default ChecklistItem;
