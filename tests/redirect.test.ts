import chai from "chai";
import { https } from "follow-redirects";
import { request } from "./util";
import validUrl from "valid-url";
import normalizeURL from "normalize-url";

describe("Generated short urls", () => {
  it("Redirect to long url", (done) => {
    const url = "https://buycoins.africa/";

    request
      .post("/graphql")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .send({ query: `query tiny($url: String!) { shortenURL(url: $url) { shortUrl, host } }`, variables: { url } })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const shortUrl = res.body.data.shortenURL.shortUrl;
        chai.assert.exists(shortUrl);
        chai.assert.isTrue(!!validUrl.isWebUri(shortUrl));

        // Test that the redirect actually works
        const redirectRequest = https.request(url, (response) => {
          chai.assert.equal(normalizeURL(url), normalizeURL(response.responseUrl));
          done();
        });

        redirectRequest.end();
      });
  });
});
