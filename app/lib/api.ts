import {
  loadTokens,
  refreshAccessToken,
  updateAccessToken,
  clearTokens,
} from "./auth";

// export const API_BASE = "https://api.knotd-app.com";
export const API_BASE = "http://localhost:4000";
export const API_VERSION = "/api/v1";

class TokenExpiredError extends Error {
  constructor() {
    super("Access token expired");
    this.name = "TokenExpiredError";
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  return apiFetchWithRetry<T>(path, options, false);
}

async function apiFetchWithRetry<T>(
  path: string,
  options?: RequestInit,
  isRetry = false,
): Promise<T> {
  const tokens = loadTokens();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (tokens?.accessToken) {
    headers["Authorization"] = `Bearer ${tokens.accessToken}`;
  }

  const response = await fetch(`${API_BASE}${API_VERSION}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !isRetry && tokens?.refreshToken) {
    try {
      const newAccessToken = await refreshAccessToken(tokens.refreshToken);
      updateAccessToken(newAccessToken);
      return apiFetchWithRetry<T>(path, options, true);
    } catch (refreshError) {
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }
      throw new TokenExpiredError();
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.error || "Unknown error";
    throw new Error(errorMessage);
  }

  return response.json();
}

// ── Subscription Plans ──────────────────────────────────────────────────────

export interface ApiSubscriptionPlan {
  id: string;
  tier: string;
  displayName: string;
  description: string;
  monthlyPrice: number | null;
  weeklyPrice: number | null;
  currency: string;
  likesQuota: number;
  likesResetHours: number;
  superLikesQuota: number;
  superLikesResetHours: number;
  seeWhoLikedYouQuota: number | null;
  seeWhoLikedYouResetHours: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function fetchSubscriptionPlans(): Promise<ApiSubscriptionPlan[]> {
  return apiFetch<ApiSubscriptionPlan[]>("/subscriptions/plans");
}

// ── Purchaseable Items ──────────────────────────────────────────────────────

export interface ApiPurchaseableItem {
  id: string;
  type: string;
  displayName: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export function fetchPurchaseableItems(): Promise<ApiPurchaseableItem[]> {
  return apiFetch<ApiPurchaseableItem[]>("/purchases/items");
}

// ── User ────────────────────────────────────────────────────────────────────

export enum SubscriptionTier {
  Free = "free",
  Lightning = "lightning",
  UltraLightning = "ultraLightning",
}

export interface ApiUser {
  id: string;
  firstName: string;
  email: string;
  displayPictureUrl: string | null;
  subscriptionTier: SubscriptionTier;
  likesRemaining: number;
  superLikesRemaining: number;
  seeWhoLikedYouRemaining: number;
}

export function fetchUser(): Promise<ApiUser | null> {
  return apiFetch<ApiUser | null>("/user/web");
}
