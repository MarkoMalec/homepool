"use client";

// Future me: This context returns users (prisma.user.findMany())
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type User = {
  id: string;
  name?: string | null;
  image?: string | null;
  color?: string | null;
  email?: string | null;
  checkedItems: {
    id: string;
    name: string;
    price: string;
    userId: string;
    checkedAt: Date;
  }[];
}[];

const UsersContext = createContext<{
  users: User | null;
  setUsers: Dispatch<SetStateAction<User | undefined>>;
}>({ users: null, setUsers: useState });

type UsersContextProviderProps = {
  children: React.ReactNode;
  initialUsers?: User;
};

export const UsersContextProvider = ({
  children,
  initialUsers,
}: UsersContextProviderProps) => {
  const [users, setUsers] = useState(initialUsers);

  if (!users) {
    return;
  }

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
