import { Router } from "express";
import { getDefaultContext } from "../graph/context";

export const getShortenUrlRoute = Router();

getShortenUrlRoute.get("/:shortUrl", async (req, res) => {
  const shortUrlCode = req.params.shortUrl;
  const ctx = getDefaultContext();
  const url = await ctx.db.findByUrlCode(shortUrlCode);

  if (!url) {
    return res.status(400).json("The short url doesn't exists in our system.");
  }

  await ctx.db.save(url);
  return res.redirect(url.longUrl);
});
