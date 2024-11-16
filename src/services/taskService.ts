import { HttpError } from "../commons/HttpError";
import { AppDataSource } from "../database";
import { Task } from "../models/task";

let taskRepository = AppDataSource.getRepository(Task);

export const setTaskRepository = (repository: typeof taskRepository) => {
  taskRepository = repository;
};

export const createTask = async (title: string): Promise<Task> => {
  const task = new Task();
  task.title = title;
  task.completed = false;
  return await taskRepository.save(task);
};

export const getTasks = async (): Promise<Task[]> => {
  return await taskRepository.find({ where: {} });
};

export const getTaskById = async (id: number): Promise<Task> => {
  const task = await taskRepository.findOne({ where: { id } })
  if (!task)
    throw new HttpError('Task not found', 404); // Inclua o código de status HTTP apropriadothrow new Error('Task not found');
  return task;
};

export const updateTask = async (id: number, title: string, completed: boolean): Promise<Task> => {
  const task = await taskRepository.findOneBy({ id });
  if (!task)
    throw new HttpError('Task not found', 404); // Inclua o código de status HTTP apropriado
  task.title = title;
  task.completed = completed;
  return await taskRepository.save(task);
};

export const deleteTask = async (id: number): Promise<void> => {
  await taskRepository.delete(id);
};