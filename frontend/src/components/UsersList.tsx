import { User } from "../entities/user.entity";
import ListItem from "./ListItem";

interface UsersListProps {
  users: User[];
  onUpdateUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
}

const UsersList = ({ users, onUpdateUser, onDeleteUser }: UsersListProps) => {
  return (
    <div className="flex flex-col gap-y-6 justify-center items-center h-full w-full overflow-auto">
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
