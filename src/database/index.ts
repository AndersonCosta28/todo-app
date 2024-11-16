import { DataSource } from "typeorm";
import { Task } from "../models/task";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  synchronize: true,
  logging: true,
  entities: [Task],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
