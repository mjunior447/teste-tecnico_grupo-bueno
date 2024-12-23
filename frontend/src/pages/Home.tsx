/* eslint-disable react-hooks/exhaustive-deps */
import UsersList from "@/components/UsersList";
import { UserContext } from "@/contexts/UserContext";
import useFetcher from "@/hooks/useFetcher";
import { useCallback, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const { users, setUsers } = useContext(UserContext);
  const { getUsers, deleteUser } = useFetcher();
  const navigate = useNavigate();

  const getUsersList = useCallback(async () => {
    const usersList = await getUsers();
    setUsers(usersList);
  }, [getUsers, setUsers]);

  useEffect(() => {
    getUsersList();
  }, []);

  const handleUpdateUser = (userId: number) => {
    navigate(`/update-user/${userId}`);
  };

  return (
    <main className="page-container">
      <article className="flex flex-col gap-14 justify-center items-center h-[500px] w-96">
        <h1 className="text-2xl font-bold text-gray-700">
          Listagem de usuários
        </h1>
        {users.length ? (
          <UsersList
            users={users}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={deleteUser}
          />
        ) : (
          <div className="text-xl font-semibold text-gray-600">
            Nenhum usuário cadastrado
          </div>
        )}

        <Link
          to="/create-user"
          className="w-full p-3 text-lg text-white bg-green-500 hover:bg-green-300 text-center rounded-md"
        >
          Criar usuário
        </Link>
      </article>
    </main>
  );
};

export default Home;
