import { StorageAdapter } from "./adapter";
import { Url } from "./models/url";

export class InMemoryAdapter implements StorageAdapter {
  store: Url[];

  constructor(seed?: Url[]) {
    this.store = seed ? seed : [];
  }

  findByLongUrl(longUrl: string): Promise<Url | undefined> {
    return Promise.resolve(this.store.find((x) => x.longUrl === longUrl));
  }

  findByUrlCode(urlCode: string): Promise<Url | undefined> {
    return Promise.resolve(this.store.find((x) => x.urlCode === urlCode));
  }

  create(payload: Url): Promise<Url> {
    // Todo: probably add some validation?
    const url: Url = { ...payload };
    this.store = [...this.store, url];
    return Promise.resolve(url);
  }

  save(payload: Url): Promise<Url> {
    // We assume the longId is the unique primary key
    const url = this.store.find((x) => x.longUrl === payload.longUrl);
    if (!url) return Promise.reject(new Error("Url does not exist in store"));
    return Promise.resolve(url);
  }
}
