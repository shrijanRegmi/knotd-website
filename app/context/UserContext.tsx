"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { type ApiUser, fetchUser } from "@/app/lib/api";
import { loadTokens } from "@/app/lib/auth";

// ── State management ────────────────────────────────────────────────────────

export enum UserStatus {
  Idle = "idle",
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}

enum UserActionType {
  Loading = "USER_LOADING",
  Success = "USER_SUCCESS",
  Unauthenticated = "USER_UNAUTHENTICATED",
  Error = "USER_ERROR",
  Update = "USER_UPDATE",
  Clear = "USER_CLEAR",
}

interface UserState {
  status: UserStatus;
  user: ApiUser | null;
  error: string | null;
}

type UserAction =
  | { type: UserActionType.Loading }
  | { type: UserActionType.Success; user: ApiUser }
  | { type: UserActionType.Unauthenticated }
  | { type: UserActionType.Error; error: string }
  | { type: UserActionType.Update; user: Partial<ApiUser> }
  | { type: UserActionType.Clear };

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionType.Loading:
      return { ...state, status: UserStatus.Loading, error: null };
    case UserActionType.Success:
      return {
        status: UserStatus.Authenticated,
        user: action.user,
        error: null,
      };
    case UserActionType.Unauthenticated:
      return { status: UserStatus.Unauthenticated, user: null, error: null };
    case UserActionType.Error:
      return {
        status: UserStatus.Unauthenticated,
        user: null,
        error: action.error,
      };
    case UserActionType.Update:
      if (!state.user) return state;
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    case UserActionType.Clear:
      return { status: UserStatus.Unauthenticated, user: null, error: null };
  }
}

// ── Context ─────────────────────────────────────────────────────────────────

interface UserContextValue {
  state: UserState;
  loadUser: () => Promise<void>;
  updateUser: (updates: Partial<ApiUser>) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    status: UserStatus.Idle,
    user: null,
    error: null,
  });

  const loadUser = useCallback(async () => {
    const tokens = loadTokens();
    if (!tokens) {
      dispatch({ type: UserActionType.Unauthenticated });
      return;
    }

    dispatch({ type: UserActionType.Loading });
    try {
      const user = await fetchUser();
      if (user) {
        dispatch({ type: UserActionType.Success, user });
      } else {
        dispatch({ type: UserActionType.Unauthenticated });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load user";
      dispatch({ type: UserActionType.Error, error: message });
    }
  }, []);

  const updateUser = useCallback((updates: Partial<ApiUser>) => {
    dispatch({ type: UserActionType.Update, user: updates });
  }, []);

  const clearUser = useCallback(() => {
    dispatch({ type: UserActionType.Clear });
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const value: UserContextValue = {
    state,
    loadUser,
    updateUser,
    clearUser,
    isAuthenticated: state.status === UserStatus.Authenticated,
    isLoading:
      state.status === UserStatus.Loading || state.status === UserStatus.Idle,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
