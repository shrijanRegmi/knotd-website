import { API_BASE, API_VERSION } from "./api";

const TOKEN_KEYS = {
  access: "knotd_access_token",
  refresh: "knotd_refresh_token",
} as const;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

export async function verifyGoogleToken(idToken: string): Promise<AuthTokens> {
  const response = await fetch(
    `${API_BASE}${API_VERSION}/auth/oauth/google/web`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.error || "Unknown error";
    throw new Error(errorMessage);
  }

  const data: AuthTokens = await response.json();

  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Invalid response from authentication server");
  }

  return data;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<string> {
  const response = await fetch(
    `${API_BASE}${API_VERSION}/auth/refresh-token/web`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.error || "Unknown error";
    throw new Error(errorMessage);
  }

  const data: RefreshTokenResponse = await response.json();

  if (!data.accessToken) {
    throw new Error("Invalid response from refresh token endpoint");
  }

  return data.accessToken;
}

export function persistTokens(tokens: AuthTokens): void {
  try {
    localStorage.setItem(TOKEN_KEYS.access, tokens.accessToken);
    localStorage.setItem(TOKEN_KEYS.refresh, tokens.refreshToken);
  } catch {
    console.error("Failed to persist auth tokens");
  }
}

export function updateAccessToken(accessToken: string): void {
  try {
    localStorage.setItem(TOKEN_KEYS.access, accessToken);
  } catch {
    console.error("Failed to update access token");
  }
}

export function loadTokens(): AuthTokens | null {
  try {
    const accessToken = localStorage.getItem(TOKEN_KEYS.access);
    const refreshToken = localStorage.getItem(TOKEN_KEYS.refresh);
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
  } catch {
    // SSR or storage unavailable
  }
  return null;
}

export function clearTokens(): void {
  try {
    localStorage.removeItem(TOKEN_KEYS.access);
    localStorage.removeItem(TOKEN_KEYS.refresh);
  } catch {
    // SSR or storage unavailable
  }
}
