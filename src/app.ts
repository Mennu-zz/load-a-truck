import "reflect-metadata";
import dotenv from "dotenv";
import { InversifyExpressServer } from "inversify-express-utils";
// import cors from "cors";
// import * as OpenApiValidator from 'express-openapi-validator';

dotenv.config();

import express from "express";
import helmet from "helmet";

import { ContainerLoader } from "./container";
import sequelize from "./db/utils/connection.mariadb";
// import loggerMiddleware from "./middleware/logger";

const app: express.Application = express();

sequelize.sync({ force: false }).then(() => {

  const container = ContainerLoader.load();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  const server = new InversifyExpressServer(container, null, null, app);
  const serverInstance = server.build();

  // app.use(
  //   OpenApiValidator.middleware({
  //     apiSpec: './src/doc/swagger.yaml',
  //     validateRequests: true, // (default)
  //     validateResponses: false, // false by default
  //   }),
  // );
  serverInstance.use((error: any, req: any, res: any, next: any) => {
    console.log(error)
    res.status(error.status).send({
      data: {
        message: error.message
      }
    })
  })
  serverInstance.listen(process.env.PORT);
  console.log(`Server started on port ${process.env.PORT}`);

}).catch(error => {
  console.error(error);
})