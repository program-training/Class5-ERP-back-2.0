import { startStandaloneServer } from "@apollo/server/standalone";
import connectionToMongoDb from "./dbAccess/mongoDBConnection";
import { connectionToPostgres } from "./dbAccess/postgresConnection";
import initialData from "./utils/initialData";
import server from "./graphql/apolloServer";
import chalk from "chalk";
import { requireAuth } from "./middleware/auth";
import { decode } from "jsonwebtoken";

const PORT = 4000;

if (!PORT) throw new Error("invalid port");

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({req}) => {
    const token = req.headers.authorization || '';
    const userInfo = decode(token);
    return {
      userInfo,
      token,
    };
  }
}).then(({ url }) => {
  console.log(chalk.blueBright(`server run on: ${url}`));
  connectionToMongoDb()
    .then((message) => console.log(chalk.blue(message)))
    .catch((error) => console.log(chalk.redBright(error.message)));
  connectionToPostgres()
    .then((message) => {
      console.log(chalk.magenta(message));
      initialData()
        .then((message) => console.log(chalk.cyan(message)))
        .catch((message) => console.log(chalk.redBright(message)));
    })
    .catch((error) => console.log(chalk.redBright(error.message)));
});
