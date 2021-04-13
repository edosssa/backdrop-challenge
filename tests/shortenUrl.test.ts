import chai from "chai";
import supertest from "supertest";
import validUrl from "valid-url";
import { bindServerToRandomPort, shortenUrlRequest } from "./util";
import { Server } from "net";
import { promisify } from "util";

describe("ShortenUrl", () => {
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

  it("Returns a valid short url", (done) => {
    const url = "https://google.com";

    shortenUrlRequest(testAgent, { url })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const shortUrl = res.body.data.shortUrl;
        chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));
        done();
      });
  });

  it("Returns an error for an invalid url", (done) => {
    const invalidUrl = "httpx://google.com";

    shortenUrlRequest(testAgent, { url: invalidUrl }).end((err, res) => {
      if (err) return done(err);
      const errors = res.body.errors;
      chai.assert.exists(errors);
      done();
    });
  });

  it("Returns same short url for multiple calls", (done) => {
    const getShortUrl = (url: string): Promise<string> => {
      return new Promise((resolve) => {
        shortenUrlRequest(testAgent, { url }).end((err, res) => {
          if (err) return done(err);
          const shortUrl = res.body.data.shortUrl;
          chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));
          resolve(shortUrl);
        });
      });
    };

    const url = "https://google.com";

    getShortUrl(url).then((shortUrl) => {
      getShortUrl(url).then((shortUrl2) => {
        chai.assert.equal(shortUrl, shortUrl2);
        done();
      });
    });
  });
});
