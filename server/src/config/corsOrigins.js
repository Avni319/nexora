const DEFAULT_ORIGINS = [
  "http://localhost:5173",
  "https://nexora-rust-beta.vercel.app",
];

export const getCorsOrigins = () => {
  const fromEnv = process.env.CLIENT_URL?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return fromEnv?.length ? fromEnv : DEFAULT_ORIGINS;
};

export const isOriginAllowed = (origin) => {
  if (!origin) return true;
  return getCorsOrigins().includes(origin);
};
