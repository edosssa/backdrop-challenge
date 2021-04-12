import { Router } from "express";
import { getDefaultContext } from "../graph/context";

export const redirectToUrl = Router();

redirectToUrl.get("/:shortUrl", async (req, res) => {
  const shortUrlCode = req.params.shortUrl;
  const ctx = getDefaultContext();
  const url = await ctx.db.findByUrlCode(shortUrlCode);

  if (!url) {
    return res.status(404).json("The short url doesn't exist in our system.");
  }

  await ctx.db.save(url);
  return res.redirect(url.longUrl);
});
