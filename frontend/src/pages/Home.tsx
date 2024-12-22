import UsersList from "@/components/UsersList";
import { UserContext } from "@/contexts/UserContext";
import useFetcher from "@/hooks/useFetcher";
import { useCallback, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const { users, setUsers } = useContext(UserContext)
  const { getUsers } = useFetcher();
  const navigate = useNavigate();

  const getUsersList = useCallback(async () => {
    const usersList = await getUsers();
    setUsers(usersList);
  }, [getUsers]);

  useEffect(() => {
    getUsersList();
  }, []);

  const handleUpdateUser = (userId: number) => {
    navigate(`/update-user/${userId}`);
  };

  const handleDeleteUser = () => {};

  return (
    <main className="page-container">
      <div className="flex flex-col gap-14 justify-center items-center h-[500px] w-96">
        <UsersList
          users={users}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />

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
