import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    shortenURL(url: String!): String!
  }
`);
