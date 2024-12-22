import { User } from "@/entities/user.entity";
import { createContext } from "react";

interface UserContextData {
  users: Array<User>;
  setUsers: (users: Array<User>) => void;
}

export const UserContext = createContext({} as UserContextData);
