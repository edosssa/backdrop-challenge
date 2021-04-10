import * as dotenv from "dotenv";

export function load() {
  // This is a noop in production
  if (process.env.NODE_ENV !== "production") {
    dotenv.config();
  }
}

export function getPort(): string {
  return process.env.PORT || "4000";
}

export function getBaseUrl(): string {
  return process.env.BASE_URL || `http://localhost:${process.env.PORT}`;
}
