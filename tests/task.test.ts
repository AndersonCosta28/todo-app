import { Task } from "../src/models/task";

describe('Task Entity', () => {
  it('should create a Task with given values', () => {
    const task = new Task();
    task.id = 1;
    task.title = "Test Task";
    task.completed = true;

    expect(task.id).toBe(1);
    expect(task.title).toBe("Test Task");
    expect(task.completed).toBe(true);
  });

  it('should create a Task with default completed value', () => {
    const task = new Task();
    task.id = 2;
    task.title = "Another Test Task";

    expect(task.id).toBe(2);
    expect(task.title).toBe("Another Test Task");
    expect(task.completed).toBeUndefined(); // Assuming the default value should be false
  });
});
