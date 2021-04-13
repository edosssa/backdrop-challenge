/**
 * Hypothetical redis adapter just as a POC
 */

import { StorageAdapter } from "./adapter";
import { Url } from "./models/url";

export class RedisAdapter implements StorageAdapter {
  findByUrlCode(urlCode: string): Promise<Url | undefined> {
    throw new Error("Method not implemented.");
  }
  create(payload: Url): Promise<Url> {
    throw new Error("Method not implemented.");
  }
  save(payload: Url): Promise<Url> {
    throw new Error("Method not implemented.");
  }
  findByLongUrl(longUrl: string): Promise<Url> {
    throw new Error("Method not implemented.");
  }
}
