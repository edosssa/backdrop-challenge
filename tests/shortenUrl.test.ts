import chai from "chai";
import supertest from "supertest";
import validUrl from "valid-url";
import { shortenUrlRequest } from "./util";
import getFreePort from "get-port";
import { server } from "../src/server";
import { Server } from "net";
import config from "../src/config";

let testAgent: supertest.SuperTest<supertest.Test>;
let listener: Server;

describe("ShortenUrl", () => {
  before(async () => {
    const port = await getFreePort();
    listener = server.listen(port, () => {
      config.set("port", port.toString());
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

  it("Returns a valid short url", (done) => {
    const url = "https://google.com";

    shortenUrlRequest(testAgent, { url })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const shortUrl = res.body.data.shortUrl;
        chai.assert.exists(shortUrl);
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
          chai.assert.exists(shortUrl);
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
