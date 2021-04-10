import dotenv from "dotenv";

export function load() {
    dotenv.config();
}

export function getPort(): string {
  return process.env.PORT || "4000";
}

export function getBaseUrl(): string {
  return process.env.BASE_URL || `http://localhost:${process.env.PORT}`;
}
