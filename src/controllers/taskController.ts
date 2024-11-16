import { Router, Request, Response } from "express";
import * as taskService from "../services/taskService";
import { HttpError } from "../commons/HttpError";

const router = Router();

router.post('/tasks', async (req: Request, res: Response) => {
  const { title } = req.body;
  const newTask = await taskService.createTask(title);
  res.status(201).json(newTask);
});

router.get('/tasks', async (req: Request, res: Response) => {
  const tasks = await taskService.getTasks();
  res.status(200).json(tasks);
});

router.delete('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const idIsNumber = !id || !isNaN(Number(id))
  if (!idIsNumber)
    throw new HttpError('Id invalid', 400);
  const _idParsed = Number(id)
  await taskService.deleteTask(_idParsed);
  res.status(204).send();
});

export default router;
