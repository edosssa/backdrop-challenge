import { snakeCase } from "snake-case";

const config: Record<string, string> = {
  port: "4000",
  baseUrl: `http://localhost:4000`,
};

export default class Config {
  static get(key: string): string {
    // By convention, env keys are in upper snake case
    const envKey = snakeCase(key).toUpperCase();
    const value = process.env[envKey] ? process.env[envKey] : config[key]
    return value || ""
  }

  static set(key: string, value: string) {
    config[key] = value;
  }
}
