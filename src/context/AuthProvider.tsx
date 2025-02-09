import { createContext, ReactNode, useContext, useReducer } from "react";

const FAKE_USER_DATA = {
  name: "alireza",
  email: "user@gmail.com",
  password: "12345",
};

type ContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<undefined | ContextType>(undefined);

type UserType = {
  name: string;
  email: string;
  password: string;
};

type InitialStateType = {
  user: UserType | null;
  isAuthenticated: boolean;
};

const initialState: InitialStateType = {
  user: null,
  isAuthenticated: false,
};

type ActionType =
  | {
      type: "login";
      payload: UserType;
    }
  | {
      type: "logout";
      payload?: never;
    };

function authReducer(_state: InitialStateType, action: ActionType) {
  const { type, payload } = action;
  switch (type) {
    case "login":
      return { user: payload, isAuthenticated: true };
    case "logout":
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("unknown dispatch");
  }
}

function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER_DATA.email && password === FAKE_USER_DATA.password)
      dispatch({ type: "login", payload: FAKE_USER_DATA });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth Context must be used within a AuthProvider");
  }
  return context;
}
