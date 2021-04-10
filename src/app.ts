import { getPort, load as loadConfig } from "./config";
import { server } from "./server";

loadConfig();
const PORT = getPort();
server.listen(PORT, () => console.log(`GraphQL API running at http://localhost:${PORT}/graphql 🚀`));
