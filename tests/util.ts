import supertest from "supertest";
import getFreePort from "get-port";
import { server } from "../src/server";
import config from "../src/config";

export const shortenUrlRequest = (
  testAgent: supertest.SuperTest<supertest.Test>,
  variables: Record<string, string>
): supertest.Test => {
  const query = `
    query tiny($url: String!) { 
        shortUrl: shortenURL(url: $url) 
    }`;

  return testAgent
    .post("/graphql")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .send({ query, variables });
};

export async function bindServerToRandomPort() {
  const port = await getFreePort();
  return server.listen(port, () => {
    // Since we are binding the server to a random port we need to update the config early so that
    // the shortenUrl resolver is aware and can generate valid short urls
    config.set("port", port.toString());
    config.set("baseUrl", `http://localhost:${port}`);
  });
}
