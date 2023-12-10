import connectionToMongoDb from "./dbAccess/mongoDBConnection";
import { connectionToPostgres } from "./dbAccess/postgresConnection";
import initialData from "./utils/initialData";
import server from "./graphql/apolloServer";
import chalk from "chalk";
import express from "express";
import morganLogger from "./logger/morgan";
import corsHandler from "./cors/cors";
import { handleServerError } from "./utils/handleErrors";

const PORT = 4000;

if (!PORT) throw new Error("invalid port");

const app = express();
app.use(morganLogger);
app.use(corsHandler);
app.use(handleServerError);

server
  .start()
  .then(() => {
    server.applyMiddleware({ app } as any);
    connectionToMongoDb()
      .then((message) => console.log(chalk.blue(message)))
      .catch((error) => console.log(chalk.redBright(error.message)));
    connectionToPostgres().then((message) => {
      console.log(chalk.magenta(message));
      initialData()
        .then((message) => console.log(chalk.cyan(message)))
        .catch((message) => console.log(chalk.redBright(message)));
    });
    app.listen({ port: 4000 }, () =>
      console.log(
        chalk.blueBright(
          `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        )
      )
    );
  })
  .catch((error) => console.log(chalk.redBright(error.message)));
