import chai from "chai";
import supertest from "supertest";
import { shortenUrlRequest } from "./util";
import validUrl from "valid-url";
import config  from "../src/config";
import { nanoid } from "nanoid";
import normalizeUrl from "normalize-url";
import { http } from "follow-redirects";
import getFreePort from "get-port";
import { server } from "../src/server";
import { Server } from "net";

let testAgent: supertest.SuperTest<supertest.Test>;
let listener: Server;

describe("Redirect", () => {
  before(async () => {
    const port = await getFreePort();
    listener = server.listen(port, () => {
      config.set("port", port.toString());
      config.set("baseUrl", `http://localhost:${port}`);
    });
    testAgent = supertest(listener);
  });

  after(() => {
    return new Promise<void>((resolve, reject) => {
      listener.close((err) => {
        if (err) return reject();
        resolve();
      });
    });
  });

  it("work for valid short url", (done) => {
    const url = "https://buycoins.africa";

    shortenUrlRequest(testAgent, { url }).end((err, res) => {
      if (err) return done(err);
      const shortUrl = res.body.data.shortUrl;
      chai.assert.exists(shortUrl);
      chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));

      // Supertest doesn't seem to follow redirects properly 
      http
        .request(shortUrl, (response) => {
          chai.assert.equal(normalizeUrl(url), normalizeUrl(response.responseUrl));
          done();
        })
        .end();
    });
  });

  it("returns 404 for invalid short url", (done) => {
    const invalidUrl = config.get("baseUrl") + "/" + nanoid(6);
    testAgent.get(invalidUrl).expect(404).end(done);
  });
});
