// Helper function to get required environment variable
const getRequiredEnv = (value: string | undefined): string => {
  if (!value) {
    throw new Error(`Required environment variable is not set`);
  }
  return value;
};

// Helper function to get optional environment variable with default
const getOptionalEnv = (
  value: string | undefined,
  defaultValue: string,
): string => {
  return value || defaultValue;
};

export const config = {
  env: getRequiredEnv(process.env.NEXT_PUBLIC_ENV),
  apiBase: getRequiredEnv(process.env.NEXT_PUBLIC_API_BASE),

  // Set NEXT_PUBLIC_PREMIUM_ENABLED=false to hide premium UI and block auth/premium routes
  premium: {
    enabled: getOptionalEnv(process.env.NEXT_PUBLIC_PREMIUM_ENABLED, "true") === "true",
  },

  google: {
    clientId: getRequiredEnv(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
    analyticsMeasurementId: getOptionalEnv(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      "",
    ),
  },
};

export const premiumCtaHref = config.premium.enabled ? "/auth" : "/#download";
