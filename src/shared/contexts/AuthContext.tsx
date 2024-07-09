import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login } from "../../api";
import { useAppDispatch } from "../../store/hooks";
import { setMessage } from "../../store/modules/SnackBarsSlice";
import { SnackBars } from "../components";

interface IAuthContextData {
  isAuthenticated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACCESS_TOKEN = "APP_ACCESS_TOKEN";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const [acessToken, setAcessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    if (accessToken) {
      verifyUser();
    } else {
      setAcessToken(undefined);
    }
  }, []);

  const verifyUser = async () => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    const result = { code: 200 };
    if (result.code === 200) {
      return setAcessToken(accessToken || undefined);
    }
    return setAcessToken(undefined);
  };

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const result = await login({ email, password });
      if (!result.data || !result.data.token) {
        dispatch(
          setMessage({ message: "Email ou senha incorretos!", status: "error" })
        );
        return;
      }
      localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, result.data.token);
      setAcessToken(result.data.token);
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAcessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!acessToken, [acessToken]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
      <SnackBars />
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
