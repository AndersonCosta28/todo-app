import { DataSource } from "typeorm";
import { Task } from "../src/models/task";
import * as taskService from "../src/services/taskService";
import { HttpError } from "../src/commons/HttpError";

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    entities: [Task],
  });
  await AppDataSource.initialize();
  taskService.setTaskRepository(AppDataSource.getRepository(Task));
});

afterAll(async () => {
  await AppDataSource.destroy();
});

test('should create a task', async () => {
  const task = await taskService.createTask("Test task");
  expect(task.title).toBe("Test task");
  expect(task.completed).toBe(false);
});

test('should get all tasks', async () => {
  const tasks = await taskService.getTasks();
  expect(tasks.length).toBe(1);
});

test('should update a task', async () => {
  const task = await taskService.createTask("Another task");
  const updatedTask = await taskService.updateTask(task.id, "Updated task", true);
  expect(updatedTask.title).toBe("Updated task");
  expect(updatedTask.completed).toBe(true);
});

test('should delete a task', async () => {
  const task = await taskService.createTask("Task to delete");
  await taskService.deleteTask(task.id);
  const tasks = await taskService.getTasks();
  expect(tasks.length).toBe(2); // 3 tasks created, 1 deleted
});