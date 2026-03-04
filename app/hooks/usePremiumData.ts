"use client";

import { useReducer, useEffect, useCallback } from "react";
import {
  type ApiSubscriptionPlan,
  type ApiPurchaseableItem,
  fetchSubscriptionPlans,
  fetchPurchaseableItems,
} from "@/app/lib/api";

// ── UI-ready types ──────────────────────────────────────────────────────────

export interface DisplayPlan {
  id: string;
  tier: string;
  displayName: string;
  description: string;
  monthlyPrice: number | null;
  weeklyPrice: number | null;
  currency: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface DisplayItem {
  id: string;
  type: string;
  displayName: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
}

// ── Transform helpers ───────────────────────────────────────────────────────

function formatResetPeriod(hours: number | null): string {
  if (hours == null) return "";
  if (hours >= 168) return "week";
  if (hours === 24) return "day";
  return `${hours} hrs`;
}

function deriveFeatures(plan: ApiSubscriptionPlan): string[] {
  const features: string[] = [];

  const likesReset = formatResetPeriod(plan.likesResetHours);
  features.push(`${plan.likesQuota} likes / ${likesReset}`);

  const superLikesReset = formatResetPeriod(plan.superLikesResetHours);
  features.push(`${plan.superLikesQuota} super likes / ${superLikesReset}`);

  if (plan.seeWhoLikedYouQuota != null) {
    const revealReset = formatResetPeriod(plan.seeWhoLikedYouResetHours);
    const label =
      plan.seeWhoLikedYouQuota === 1
        ? "1 reveal"
        : `${plan.seeWhoLikedYouQuota} reveals`;
    features.push(`${label} / ${revealReset}`);
  } else if (plan.monthlyPrice != null) {
    features.push("Unlimited reveals");
  }

  return features;
}

function transformPlan(plan: ApiSubscriptionPlan): DisplayPlan {
  return {
    id: plan.id,
    tier: plan.tier,
    displayName: plan.displayName,
    description: plan.description,
    monthlyPrice: plan.monthlyPrice != null ? plan.monthlyPrice / 100 : null,
    weeklyPrice: plan.weeklyPrice != null ? plan.weeklyPrice / 100 : null,
    currency: plan.currency,
    features: deriveFeatures(plan),
    cta:
      plan.monthlyPrice != null
        ? `Upgrade to ${plan.displayName}`
        : "Current Plan",
    popular: plan.tier === "lightning",
  };
}

function transformItem(item: ApiPurchaseableItem): DisplayItem {
  return {
    id: item.id,
    type: item.type,
    displayName: item.displayName,
    description: item.description,
    quantity: item.quantity,
    price: item.price / 100,
    currency: item.currency,
  };
}

function groupItems(
  items: ApiPurchaseableItem[],
): Record<string, DisplayItem[]> {
  const grouped: Record<string, DisplayItem[]> = {};
  for (const item of items) {
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type].push(transformItem(item));
  }
  return grouped;
}

// ── State management ────────────────────────────────────────────────────────

export enum AsyncStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

enum PremiumActionType {
  PlansLoading = "PLANS_LOADING",
  PlansSuccess = "PLANS_SUCCESS",
  PlansError = "PLANS_ERROR",
  ItemsLoading = "ITEMS_LOADING",
  ItemsSuccess = "ITEMS_SUCCESS",
  ItemsError = "ITEMS_ERROR",
}

interface PremiumState {
  plans: DisplayPlan[];
  plansStatus: AsyncStatus;
  plansError: string | null;

  items: Record<string, DisplayItem[]>;
  itemsStatus: AsyncStatus;
  itemsError: string | null;
}

type PremiumAction =
  | { type: PremiumActionType.PlansLoading }
  | { type: PremiumActionType.PlansSuccess; plans: DisplayPlan[] }
  | { type: PremiumActionType.PlansError; error: string }
  | { type: PremiumActionType.ItemsLoading }
  | { type: PremiumActionType.ItemsSuccess; items: Record<string, DisplayItem[]> }
  | { type: PremiumActionType.ItemsError; error: string };

const initialState: PremiumState = {
  plans: [],
  plansStatus: AsyncStatus.Idle,
  plansError: null,
  items: {},
  itemsStatus: AsyncStatus.Idle,
  itemsError: null,
};

function premiumReducer(
  state: PremiumState,
  action: PremiumAction,
): PremiumState {
  switch (action.type) {
    case PremiumActionType.PlansLoading:
      return { ...state, plansStatus: AsyncStatus.Loading, plansError: null };
    case PremiumActionType.PlansSuccess:
      return {
        ...state,
        plansStatus: AsyncStatus.Success,
        plans: action.plans,
        plansError: null,
      };
    case PremiumActionType.PlansError:
      return { ...state, plansStatus: AsyncStatus.Error, plansError: action.error };
    case PremiumActionType.ItemsLoading:
      return { ...state, itemsStatus: AsyncStatus.Loading, itemsError: null };
    case PremiumActionType.ItemsSuccess:
      return {
        ...state,
        itemsStatus: AsyncStatus.Success,
        items: action.items,
        itemsError: null,
      };
    case PremiumActionType.ItemsError:
      return { ...state, itemsStatus: AsyncStatus.Error, itemsError: action.error };
  }
}

export function usePremiumData() {
  const [state, dispatch] = useReducer(premiumReducer, initialState);

  const loadPlans = useCallback(async () => {
    dispatch({ type: PremiumActionType.PlansLoading });
    try {
      const raw = await fetchSubscriptionPlans();
      const plans = raw
        .filter((p) => p.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(transformPlan);
      dispatch({ type: PremiumActionType.PlansSuccess, plans });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load plans";
      dispatch({ type: PremiumActionType.PlansError, error: message });
    }
  }, []);

  const loadItems = useCallback(async () => {
    dispatch({ type: PremiumActionType.ItemsLoading });
    try {
      const raw = await fetchPurchaseableItems();
      const active = raw
        .filter((i) => i.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      const items = groupItems(active);
      dispatch({ type: PremiumActionType.ItemsSuccess, items });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load items";
      dispatch({ type: PremiumActionType.ItemsError, error: message });
    }
  }, []);

  useEffect(() => {
    loadPlans();
    loadItems();
  }, [loadPlans, loadItems]);

  return {
    ...state,
    retryPlans: loadPlans,
    retryItems: loadItems,
  };
}
