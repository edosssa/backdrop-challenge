import express from "express";
import { graphqlHTTP } from "express-graphql";
import { graphiql } from "./graphiql";
import { resolverRoot, schema } from "./graph";
import { getDefaultContext, setDefaultContext } from "./graph/context";
import { InMemoryAdapter } from "./lib/storage";
import { getShortenUrlRoute } from "./routes";

export const server = express();
setDefaultContext({ db: new InMemoryAdapter() });

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolverRoot,
    context: getDefaultContext(),
    // The default graphql middleware that ships with express-graphql does not allow
    // mounting graphiql on a custom route, see https://github.com/graphql/express-graphql/blob/main/src/renderGraphiQL.ts#L10.
    // So disable it and use our custom middleware implementation in /src/graphiql
    graphiql: false,
  })
);

const defaultQuery = `mutation tinyUrl($url: String!) {
  shortenURL(url: $url) {
    urlCode
    longUrl
    shortUrl
    host
  }
}`;

server.use("/graphiql", graphiql({ query: defaultQuery, variables: { url: "https://buycoins.africa" } }));

server.use(getShortenUrlRoute);
