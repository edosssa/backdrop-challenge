import { StorageAdapter } from "../store/adapter";

export interface Context {
  store: StorageAdapter;
}

let instance: Context;

export const getDefaultContext = (): Context => instance;

export const setDefaultContext = (ctx: Context) => (instance = ctx);
