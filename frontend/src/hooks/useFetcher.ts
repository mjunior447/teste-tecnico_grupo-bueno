import { baseApiUrl } from "../constants";

const useFetcher = () => {
  const getUsers = async () => {
    const response = await fetch(baseApiUrl + "users");
    const users = response.json();
    return users;
  };

  const createUser = async (name: string, email: string) => {
    const userCreated = await fetch(baseApiUrl + "users", {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    return userCreated;
  };

  const updateUser = async () => {};

  const deleteUser = async () => {};

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useFetcher;
