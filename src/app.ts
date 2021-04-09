import { server } from "./server";

if (!process.env.PORT) {
  process.env.PORT = "4000";
}

if (!process.env.BASE_URL) {
  process.env.BASE_URL = `http://localhost:${process.env.PORT}`;
}

const PORT = process.env.PORT;

server.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
