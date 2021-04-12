import config from "./config";
import { server } from "./server";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = config.get("port");
server.listen(port, () =>
  console.log(`GraphQL API running at http://localhost:${port}/graphql 🚀`)
);
