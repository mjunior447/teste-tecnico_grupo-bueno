import { User } from "../entities/user.entity";
import ListItem from "./ListItem";

interface UsersListProps {
  users: User[];
  onUpdateUser: (userId: number) => void;
  onDeleteUser: (id: string) => Promise<void>;
}

const UsersList = ({ users, onUpdateUser, onDeleteUser }: UsersListProps) => {
  return (
    <div className="flex flex-col gap-3 max-h-[600px] pr-3 overflow-y-auto">
      {users.map((user) => (
        <ListItem
          key={user.id}
          user={user}
          onUpdateUser={onUpdateUser}
          onDeleteUser={onDeleteUser}
        />
      ))}
    </div>
  );
};

export default UsersList;
