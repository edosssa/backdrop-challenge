import { buildSchema } from "graphql";

const source = `
type Url {
    urlCode: String!
    longUrl: String!
    shortUrl: String!
    host: String!
  }
  
  type Mutation {
    shortenURL(url: String!): Url!
  }
  
  type Query {
    _empty: Boolean
  }
  `;
export const schema = buildSchema(source);
