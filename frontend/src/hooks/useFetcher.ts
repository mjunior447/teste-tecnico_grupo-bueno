import { baseApiUrl } from "../constants";

const useFetcher = () => {
  const getUsers = async () => {
    const response = await fetch(baseApiUrl + "users");
    const users = await response.json();

    return users;
  };

  const createUser = async (name: string, email: string) => {
    const response = await fetch(baseApiUrl + "users", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    if (!response.ok) {
      throw { status: response.status, message: response.statusText };
    }

    return response;
  };

  const updateUser = async (id: string, name: string, email: string) => {
    const response = await fetch(baseApiUrl + "users/" + id, {
      method: "PUT",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    if (!response.ok) {
      throw { status: response.status, message: response.statusText };
    }

    return response;
  };

  const deleteUser = async (id: string) => {
    const response = await fetch(baseApiUrl + "users/" + id, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir usuario");
    }
  };

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useFetcher;
