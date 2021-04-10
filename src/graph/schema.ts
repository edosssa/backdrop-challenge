import { buildSchema } from "graphql";

export const schema = buildSchema(`
type Url {
    urlCode: String!
    longUrl: String!
    shortUrl: String!
    host: String!
  }
  
  type Query {
    shortenURL(url: String!): Url!
  }
`);
