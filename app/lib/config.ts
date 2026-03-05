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

  google: {
    clientId: getRequiredEnv(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
    analyticsMeasurementId: getOptionalEnv(
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      "",
    ),
  },
};
