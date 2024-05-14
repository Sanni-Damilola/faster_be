import express, { Application, Response, Request, NextFunction } from "express";

import cors from "cors";

import morgan from "morgan";
import { errorHandler } from "./MiddleWare/Error/ErrorHandler";
import { HTTPCODES, MainAppError } from "./Utils/MainAppError";
import routes from "./routes/route";

export const MainAppConfig = (app: Application) => {
  app
    .use(cors())
    .use(morgan("dev"))
    .use(express.json())
    .get("/", (req: Request, res: Response) => {
      res.status(HTTPCODES.OK).json({
        message: "AD Ready 🚀🚀",
      });
      // landing route
    })

    .use("/api", routes) //Routes
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      //   Configuring Routes for the application:
      return next(
        new MainAppError({
          message: `Are You Lost? ${req.originalUrl} Not found`,
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }) // 404 Routes
    .use(errorHandler); // error handler
};
