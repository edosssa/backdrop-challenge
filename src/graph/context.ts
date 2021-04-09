import { StorageAdapter } from "../lib/storage/adapter";

export interface Context {
  db: StorageAdapter;
}

let instance: Context;

export const getDefaultContext = (): Context => instance;

export const setDefaultContext = (ctx: Context) => (instance = ctx);
