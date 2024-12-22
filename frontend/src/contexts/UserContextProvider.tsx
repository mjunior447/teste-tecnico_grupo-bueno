import { PropsWithChildren, useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "@/entities/user.entity";

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [users, setUsers] = useState([] as User[]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
