"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { redirect } from "next/navigation";

interface User {
  id: string;
  name?: string | null;
  image?: string | null;
  color?: string | null;
  email?: string | null;
  checkedItems: {
    price: string;
    checkedAt: Date;
  }[];
}

// Adjust the context to provide an object with user and possibly other properties
const UserContext = createContext<{
  user: User | null;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}>({ user: null, setUser: useState });

type UserContextProviderProps = {
  children: React.ReactNode;
  initialUser?: User;
};

export const UserContextProvider = ({
  children,
  initialUser,
}: UserContextProviderProps) => {
  const [user, setUser] = useState(initialUser);

  if (!user) {
    return redirect("/api/auth/signin");
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
