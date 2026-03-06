import {
  loadTokens,
  refreshAccessToken,
  updateAccessToken,
  clearTokens,
} from "./auth";
import { config } from "./config";

export const API_BASE = config.apiBase;
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

// ── Subscriptions ───────────────────────────────────────────────────────────

export interface UserSubscription {
  id: string;
  planId: string;
  billingCycle: "monthly" | "weekly";
  status: "active" | "cancelled" | "expired";
  startedAt: string;
  expiresAt: string;
  plan: ApiSubscriptionPlan;
}

export function fetchActiveSubscription(): Promise<UserSubscription | null> {
  return apiFetch<UserSubscription | null>("/subscriptions/active");
}

export function cancelSubscription(): Promise<{
  subscription: UserSubscription;
}> {
  return apiFetch<{ subscription: UserSubscription }>(`/subscriptions/cancel`, {
    method: "POST",
  });
}

// ── eSewa Payments ───────────────────────────────────────────────────────────

export type EsewaInitiateBody =
  | {
      type: "subscription";
      subscriptionPlanId: string;
      billingCycle: "monthly" | "weekly";
    }
  | { type: "purchase"; purchasableItemId: string };

export interface EsewaInitiateResponse {
  esewaPaymentUrl: string;
  formData: Record<string, string>;
}

export interface EsewaPayment {
  id: string;
  transactionUuid: string;
  status: string;
  esewaTransactionCode: string;
  esewaStatus: string;
  esewaRefId: string;
  userSubscriptionId?: string;
  purchaseId?: string;
}

export interface EsewaSubscription {
  id: string;
  planId: string;
  billingCycle: string;
  status: string;
  startedAt: string;
  expiresAt: string;
  plan: ApiSubscriptionPlan;
}

export interface EsewaPurchase {
  id: string;
  itemId: string;
  quantity: number;
  item: ApiPurchaseableItem;
}

export type EsewaCompleteResponse =
  | { payment: EsewaPayment; subscription: EsewaSubscription; purchase?: never }
  | { payment: EsewaPayment; purchase: EsewaPurchase; subscription?: never };

export function initiateEsewaPayment(
  body: EsewaInitiateBody,
): Promise<EsewaInitiateResponse> {
  return apiFetch<EsewaInitiateResponse>("/payments/esewa/initiate-epay", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function completeEsewaPayment(
  data: string,
): Promise<EsewaCompleteResponse> {
  return apiFetch<EsewaCompleteResponse>("/payments/esewa/complete-epay", {
    method: "POST",
    body: JSON.stringify({ data, scope: "web" }),
  });
}

export function checkEsewaPaymentStatus(
  transactionUuid: string,
): Promise<{ payment: EsewaPayment }> {
  return apiFetch<{ payment: EsewaPayment }>(
    `/payments/esewa/status/${transactionUuid}`,
  );
}
