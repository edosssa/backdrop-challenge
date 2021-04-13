import chai from "chai";
import supertest from "supertest";
import { bindServerToRandomPort, shortenUrlRequest } from "./util";
import validUrl from "valid-url";
import config from "../src/config";
import { nanoid } from "nanoid";
import normalizeUrl from "normalize-url";
import { http } from "follow-redirects";
import { Server } from "net";
import { promisify } from "util";

describe("Redirect", () => {
  let testAgent: supertest.SuperTest<supertest.Test>;
  let srv: Server;

  before(async () => {
    srv = await bindServerToRandomPort();
    testAgent = supertest(srv);
  });

  after(async () => {
    const closeAsync = promisify(srv.close);
    await closeAsync.bind(srv)();
  });

  it("work for valid short url", (done) => {
    const url = "https://buycoins.africa";

    shortenUrlRequest(testAgent, { url }).end((err, res) => {
      if (err) return done(err);
      const shortUrl = res.body.data.shortUrl;
      chai.assert.exists(shortUrl);
      chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));

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
    http
      .request(invalidUrl, (response) => {
        chai.assert.equal(404, response.statusCode);
        done();
      })
      .end();
  });
});
