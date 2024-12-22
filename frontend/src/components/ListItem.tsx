import { User } from "@/entities/user.entity";
import { Button } from "./ui/button";

type ListItemProps = {
  user: User;
  onUpdateUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
};

const ListItem = ({ user, onUpdateUser, onDeleteUser }: ListItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 px-6 w-full h-28 border-slate-200 border rounded-lg shadow-sm">
      <div>
        <p className="text-lg">{user.name}</p>
        <p className="text-sm">{user.email}</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <Button variant="outline" onClick={() => onUpdateUser(user.id)}>
          Alterar
        </Button>
        <Button variant="destructive" onClick={() => onDeleteUser(user.id)}>
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
