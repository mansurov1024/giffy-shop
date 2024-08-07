import { createContext, ReactNode, useEffect, useState } from "react";

export interface IUser {
  token: string;
  name: string;
  email: string;
  imageUrl: string;
}

interface IAuthContext {
  user: IUser | null;
  saveUser: (user: IUser | null) => void;
}

const initialValue: IAuthContext = {
  user: null,
  saveUser: () => {},
}

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<IUser | null>(initialValue.user);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userJson = JSON.parse(user);
      setUser(userJson);
    }
  }, []);

  function saveUser(user: IUser | null) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{user, saveUser}}>
      {children}
    </AuthContext.Provider>
  )
}
