import "reflect-metadata";
import { connectDB } from "./database/index";
import app from "./app";

const startServer = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();
