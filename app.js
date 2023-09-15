import "dotenv/config";
import cors from "cors";
import express from "express";
import connectToMongo from "./models/index.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";

if (!process.env.PORT) {
  console.log("please provide PORT number and try again");
  process.exit();
}
if (!process.env.SECRET) {
  console.log("please provide SECRET and try again");
  process.exit();
}

connectToMongo().then((connection) => {
  const app = express();

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(
    cors({
      origin: [process.env.CLIENT],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/auth", authRouter);

  app.listen(process.env.PORT, () =>
    console.log("listening on " + process.env.PORT)
  );
});
