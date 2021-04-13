import { Url } from "./models/url";

export interface StorageAdapter {
  findByLongUrl(longUrl: string): Promise<Url | undefined>;
  findByUrlCode(urlCode: string): Promise<Url | undefined>;
  create(payload: Url): Promise<Url>
  save(payload: Url): Promise<Url>
}
