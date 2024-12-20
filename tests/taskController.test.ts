import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/database';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Task API Endpoints', () => {
  let taskId: number;

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .expect(201);

    expect(res.body.title).toBe('Test Task');
    expect(res.body.completed).toBe(false);
    taskId = res.body.id;
  });

  it('should fetch all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Test Task');
  });

  it('should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Updated Task', completed: true })
      .expect(200);

    expect(res.body.title).toBe('Updated Task');
    expect(res.body.completed).toBe(true);
  });

  it('should delete a task', async () => {
    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .expect(204);

    const res = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(res.body).toHaveLength(0);
  });

  // Adicionando testes para PUT /tasks/:id com ID inválido
  it('should return 400 for updating task with invalid ID', async () => {
    const res = await request(app)
      .put('/api/tasks/invalid-id')
      .send({ title: 'Updated Task', completed: true })
      .expect(400);

    expect(res.body.error.message).toBe('Id invalid');
  });

  it('should return 404 for updating non-existent task', async () => {
    const res = await request(app)
      .put('/api/tasks/9999')
      .send({ title: 'Updated Task', completed: true })
      .expect(404);

    expect(res.body.error.message).toBe('Task not found');
  });
});
