import { Context } from "../context";
import nanoid from "nanoid";
import validUrl from "valid-url";

type ShortenUrlArgs = {
  url: string;
};

export const shortenUrlMutation = async (args: ShortenUrlArgs, ctx: Context) => {
  const longUrl = args.url;
  const baseUrl = process.env.baseURL as string;

  if (!validUrl.isUri(baseUrl)) {
    throw new Error("Internal error. Please come back later.");
  }

  if (!validUrl.isUri(longUrl)) {
    throw new Error("Invalid URL. Please enter a valid url for shortening.");
  }

  const url = await ctx.db.findByLongUrl(longUrl);
  // If this url has already been shortened, just return it
  if (url) return url;

  const urlCode = nanoid.nanoid(6)
  const shortUrl = baseUrl + "/" + urlCode;

  return await ctx.db.create({ longUrl, shortUrl, urlCode, host: baseUrl });
};
