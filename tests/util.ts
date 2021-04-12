import supertest from "supertest";

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
