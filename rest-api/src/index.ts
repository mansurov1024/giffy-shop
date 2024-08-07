import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import gifsRoutes from './gifs/routes';
import ordersRoutes from './orders/routes';
import verifyToken from "./middlewares/verify-token.middleware";
import cors from "cors";
import { IUser } from "./common/user.interface";
import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

const main = () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))
  app.use(verifyToken);
  app.use('/gifs', gifsRoutes);
  app.use('/orders', ordersRoutes);


  app.get("/", (req: Request, res: Response) => {
    res.send("REST API");
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

(async () => {
  try {
      await mongoose.connect('mongodb://mongo:27017/giffy');
      console.log("Successfully connected to the database");
      main();
  } catch (e) {
      console.log('Something went wrong. Exiting now...', e);
      process.exit();
  }
})();