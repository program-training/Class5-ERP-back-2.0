import { NextFunction, Response, Request } from "express";
import chalk from "chalk";

export const handleError = (
  res: Response,
  error: any,
  status: number = 400
) => {
  if (error && error instanceof Error)
    return res.status(status).send(error.message);
  return res.status(status).send("Oops... an error accorded");
};

export const handleJsonfileError = <T>(error: T) => {
  if (error instanceof Error) return Promise.reject(error);
  console.log(chalk.redBright(error));
  return Promise.reject(new Error("Something went wong!"));
};

export const handleServerError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(chalk.redBright(error.message));
  res.status(500).send(error.message);
};
