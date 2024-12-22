import List from "@/components/List";
import ListItem from "@/components/ListItem";
import { User } from "@/entities/user.entity";
import useFetcher from "@/hooks/useFetcher";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { getUsers } = useFetcher();

  const getUsersList = useCallback(async () => {
    const usersList = await getUsers();
    setUsers(usersList);
  }, [getUsers]);

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <main className="page-container">
      <div className="flex flex-col gap-14 justify-center items-center h-[500px] w-96">
        <List>
          {users.map((user) => (
            <ListItem key={user.email} name={user.name} email={user.email} />
          ))}
        </List>

        <Link
          to="/create-user"
          className="w-full p-3 text-lg text-white bg-green-500 hover:bg-green-300 text-center rounded-md"
        >
          Criar usuário
        </Link>
      </div>
    </main>
  );
};

export default Home;
