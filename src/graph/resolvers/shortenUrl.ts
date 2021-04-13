import { Context } from "../context";
import nanoid from "nanoid";
import validUrl from "valid-url";
import config from "../../config";

type ShortenUrlArgs = {
  url: string;
};

export const shortenURL = async (args: ShortenUrlArgs, ctx: Context) => {
  const longUrl = args.url;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isWebUri(baseUrl)) {
    throw new Error("Internal error. Please come back later.");
  }

  if (!validUrl.isWebUri(longUrl)) {
    throw new Error("Invalid URL. Please enter a valid url for shortening.");
  }

  const url = await ctx.store.findByLongUrl(longUrl);
  // If this url has already been shortened, just return it
  if (url) return url.shortUrl;

  const urlCode = nanoid.nanoid(6);
  const shortUrl = baseUrl + "/" + urlCode;

  await ctx.store.create({ longUrl, shortUrl, urlCode });

  return shortUrl
};
