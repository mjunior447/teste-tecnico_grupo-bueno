/* eslint-disable react-hooks/exhaustive-deps */
import { User } from "@/entities/user.entity";
import { Button } from "./ui/button";
import { useCallback, useContext, useState } from "react";
import Modal from "./Modal";
import { useToast } from "@/hooks/use-toast";
import { UserContext } from "@/contexts/UserContext";
import useFetcher from "@/hooks/useFetcher";
import { extractUTCDate, extractUTCTime } from "@/utils/dateUtils";

type ListItemProps = {
  user: User;
  onUpdateUser: (userId: number) => void;
  onDeleteUser: (id: string) => Promise<void>;
};

const ListItem = ({ user, onUpdateUser, onDeleteUser }: ListItemProps) => {
  const [showModal, setShowModal] = useState(false);
  const { setUsers } = useContext(UserContext);
  const { getUsers } = useFetcher();
  const { toast } = useToast();

  const getUsersList = useCallback(async () => {
    const usersList = await getUsers();
    setUsers(usersList);
  }, [getUsers]);

  return (
    <>
      <div className="flex justify-between items-center gap-3 p-4 px-6 w-full h-28 border-slate-200 border rounded-lg shadow-sm">
        <div>
          <p className="text-lg">{user.name}</p>
          <p className="text-sm">{user.email}</p>
          <p className="text-xs text-gray-400 mt-4">
            Criação: {extractUTCDate(user.created_at)} às{" "}
            {extractUTCTime(user.created_at)}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <Button variant="outline" onClick={() => onUpdateUser(user.id)}>
            Alterar
          </Button>
          <Button variant="destructive" onClick={() => setShowModal(true)}>
            Excluir
          </Button>
        </div>
      </div>
      <Modal
        open={showModal}
        onOpenChange={() => setShowModal(!showModal)}
        onCancel={() => setShowModal(false)}
        onContinue={async () => {
          await onDeleteUser(String(user.id));

          toast({
            title: "Sucesso",
            description: "O usuário foi excluído.",
          });

          await getUsersList();
        }}
      />
    </>
  );
};

export default ListItem;
