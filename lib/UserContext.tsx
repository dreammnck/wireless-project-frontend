import { createContext, ReactNode, useContext, useState } from "react";
interface UserContextType {
  username: string;
  setUsername: (_: string) => void;
  password: string;
  setPassword: (_: string) => void;
  token: string;
  setToken: (_: string) => void;
}
export const UserContext = createContext({} as UserContextType);
const UserProvider = ({ children }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  return (
    <UserContext.Provider
      value={{ username, setUsername, password, setPassword, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
