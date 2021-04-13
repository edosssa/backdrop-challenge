import express from "express";
import { graphqlHTTP } from "express-graphql";
import { graphiql } from "./graphiql";
import { resolverRoot, schema } from "./graph";
import { getDefaultContext, setDefaultContext } from "./graph/context";
import { InMemoryAdapter } from "./store";
import { redirectToUrl } from "./routes";

export const server = express();
// This can be swapped out for say a Redis or a MongoDB implementation. See src/lib/storage
setDefaultContext({ store: new InMemoryAdapter() });
// setDefaultContext({ db: new RedisAdapter() });

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

const defaultQuery = `query tinyUrl($url: String!) {
  shortUrl: shortenURL(url: $url)
}`;

server.use("/graphiql", graphiql({ query: defaultQuery, variables: { url: "https://buycoins.africa" } }));

server.use(redirectToUrl);
