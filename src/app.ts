import express from "express";
import "express-async-errors"
import taskRoutes from "./controllers/taskController";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);
app.use(errorHandler);

export default app;
