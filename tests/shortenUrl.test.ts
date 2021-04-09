import chai from "chai";
import validUrl from "valid-url";
import { request } from "./util";

describe("ShortenUrl mutation", () => {
  it("Returns a valid short url", (done) => {
    request
      .post("/graphql")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({
        query: 'mutation tiny($url: String!) { shortenURL(url: $url) { shortUrl } }',
        variables: { url: "https://google.com" },
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const shortUrl = res.body.data.shortenURL.shortUrl;
        chai.assert.exists(shortUrl);
        chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));
        done();
      });
  });

  it("Returns same short url for multiple calls", (done) => {
    const getShortUrl = (): Promise<string> => {
      return new Promise((resolve) => {
        request
          .post("/graphql")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .send({
            query: 'mutation tiny($url: String!) { shortenURL(url: $url) { shortUrl } }',
            variables: { url: "https://google.com" },
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const shortUrl = res.body.data.shortenURL.shortUrl;
            chai.assert.exists(shortUrl);
            chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));
            resolve(shortUrl);
          });
      });
    };

    getShortUrl().then((shortUrl) => {
      getShortUrl().then((shortUrl2) => {
        chai.assert.equal(shortUrl, shortUrl2);
        done();
      });
    });
  });
});
