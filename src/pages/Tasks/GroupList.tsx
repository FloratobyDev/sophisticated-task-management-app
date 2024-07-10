import { GroupType } from "../../types";

type Props = {
  groups: GroupType[];
  onClick: (groupId: string) => () => void;
};

const GroupList = ({ groups, onClick }: Props) => {
  return (
    <div>
      {groups.map((group) => (
        <button key={group.id} onClick={onClick(group.id)}>
          {group.name}
        </button>
      ))}
    </div>
  );
};

export default GroupList;
