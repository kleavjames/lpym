import { FC, createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns/format";
import { isSameDay } from "date-fns/isSameDay";

type Context = {
  user: UserProps | null;
  onLogin: (name: string, role: string) => void;
  onLogout: () => void;
  dateLoggedIn: string;
};

const AuthContext = createContext<Context>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
  dateLoggedIn: '',
});

type AuthProps = {
  children: React.ReactNode;
};

type UserProps = {
  name: string;
  role: string;
  valid: string;
};

const dateFormatted = format(new Date(), "MMM-dd-yyyy");

const AuthProvider: FC<AuthProps> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProps | null>(null);

  const onLoadUser = useCallback(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const parsed: UserProps = JSON.parse(loggedInUser);
      if (!isSameDay(parsed.valid, dateFormatted)) {
        handleLogout();
        return;
      }

      setUser(parsed);
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
          valid: dateFormatted,
        })
      );
      setUser({
        name: username,
        role,
        valid: dateFormatted,
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
    dateLoggedIn: dateFormatted,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };

export default AuthProvider;
