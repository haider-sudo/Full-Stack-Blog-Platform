import express from "express";
import db from "./src/models";
import { resolvers } from "./src/graphql/resolvers";
import { typeDefs } from "./src/graphql/schemas/schema";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { createAuthContext } from "./src/context/authContext";

const app: any = express();
app.use(cors());
app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: (context) => createAuthContext(context),
});

const start = async () => {
  await server.start();
  server.applyMiddleware({ app, cors: true });
  app.listen(4000, () => {
    console.log(`Server listening at ${4000}`);
  });
};

db.sequelize.sync().then(() => {});

start();
