import { Button } from "./ui/button";

type ListItemProps = {
  name: string;
  email: string;
};

const ListItem = ({ name, email }: ListItemProps) => {
  return (
    <div className="flex justify-between items-center p-4 px-6 w-full h-28 border-slate-200 border rounded-lg shadow-sm">
      <div>
        <p className="text-lg">{name}</p>
        <p className="text-sm">{email}</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <Button variant="outline" onClick={() => {
          
        }}>
          alterar
        </Button>
        <Button variant="destructive" onClick={() => {}}>
          excluir
        </Button>
      </div>
    </div>
  );
};

export default ListItem;
