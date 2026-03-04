"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type AuthTokens,
  verifyGoogleToken,
  persistTokens,
  loadTokens,
  clearTokens,
} from "@/app/lib/auth";

export enum AuthStatus {
  Idle = "idle",
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}

enum AuthActionType {
  Start = "AUTH_START",
  Success = "AUTH_SUCCESS",
  Error = "AUTH_ERROR",
  Logout = "LOGOUT",
  Hydrated = "HYDRATED",
}

interface AuthState {
  status: AuthStatus;
  tokens: AuthTokens | null;
  error: string | null;
}

type AuthAction =
  | { type: AuthActionType.Start }
  | { type: AuthActionType.Success; tokens: AuthTokens }
  | { type: AuthActionType.Error; error: string }
  | { type: AuthActionType.Logout }
  | { type: AuthActionType.Hydrated; tokens: AuthTokens | null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.Start:
      return { ...state, status: AuthStatus.Loading, error: null };
    case AuthActionType.Success:
      return {
        status: AuthStatus.Authenticated,
        tokens: action.tokens,
        error: null,
      };
    case AuthActionType.Error:
      return {
        status: AuthStatus.Unauthenticated,
        tokens: null,
        error: action.error,
      };
    case AuthActionType.Logout:
      return { status: AuthStatus.Unauthenticated, tokens: null, error: null };
    case AuthActionType.Hydrated:
      return {
        status: action.tokens
          ? AuthStatus.Authenticated
          : AuthStatus.Unauthenticated,
        tokens: action.tokens,
        error: null,
      };
  }
}

interface AuthContextValue {
  state: AuthState;
  loginWithGoogle: (idToken: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    status: AuthStatus.Idle,
    tokens: null,
    error: null,
  });

  useEffect(() => {
    const tokens = loadTokens();
    dispatch({ type: AuthActionType.Hydrated, tokens });
  }, []);

  const loginWithGoogle = useCallback(
    async (idToken: string): Promise<boolean> => {
      dispatch({ type: AuthActionType.Start });
      try {
        const tokens = await verifyGoogleToken(idToken);
        persistTokens(tokens);
        dispatch({ type: AuthActionType.Success, tokens });
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Authentication failed";
        dispatch({ type: AuthActionType.Error, error: message });
        return false;
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearTokens();
    dispatch({ type: AuthActionType.Logout });
  }, []);

  const value: AuthContextValue = {
    state,
    loginWithGoogle,
    logout,
    isAuthenticated: state.status === AuthStatus.Authenticated,
    isLoading:
      state.status === AuthStatus.Loading || state.status === AuthStatus.Idle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
