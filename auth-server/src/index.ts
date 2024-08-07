import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { addFailedAttempt, checkBlocked } from "./rate-limit.middleware";
import jwt from "jsonwebtoken";
import cors from "cors";

const main = () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 3000;

  app.use(cors())
  app.use(checkBlocked);
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("AUTH SERVICE");
  });

  app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
      console.log('Secret key not set!');
      return;
    }

    if (email === "johndoe@test.com" && password === "123456") {
      const token = jwt.sign(
        {
          email: email,
          name: "John Doe",
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        secretKey,
        {
          expiresIn: '1h',
        }
      );
      res.status(200).json({ token });
      
    } else {
      const ip = req.ip;
      await addFailedAttempt(ip);
      res.status(401).json({ message: "Unathorized" });
    }
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

(async () => {
  try {
      main();
  } catch (e) {
      console.log('Something went wrong. Exiting now...', e);
      process.exit();
  }
})();
