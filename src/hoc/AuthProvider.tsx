import { FC, createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Context = {
  user: UserProps | null;
  onLogin: (name: string, role: string) => void;
  onLogout: () => void;
};

const AuthContext = createContext<Context>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
});

type AuthProps = {
  children: React.ReactNode;
};

type UserProps = {
  name: string;
  role: string;
};

const AuthProvider: FC<AuthProps> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProps | null>(null);

  const onLoadUser = useCallback(() => {
    const parsedUser = localStorage.getItem("user");
    if (parsedUser) {
      setUser(JSON.parse(parsedUser));
      navigate("/tally", { replace: true });
    } else {
      setUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onLoadUser();
  }, [onLoadUser]);

  const handleLogin = useCallback(
    (username: string, role: string) => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: username,
          role,
        })
      );
      setUser({
        name: username,
        role,
      });
      navigate("/tally", { replace: true });
    },
    [navigate]
  );

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };

export default AuthProvider;
