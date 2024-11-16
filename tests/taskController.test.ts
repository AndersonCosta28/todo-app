import request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/database';
import { Task } from '../src/models/task';

beforeEach(async () => {
  await AppDataSource.initialize();
});

afterEach(async () => {
  await AppDataSource.destroy();
});

describe('Task API Endpoints', () => {

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .expect(201);

    expect(res.body.title).toBe('Test Task');
    expect(res.body.completed).toBe(false);
  });

  it('should fetch all tasks', async () => {
    await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .expect(201);

    const res = await request(app)
      .get('/api/tasks')
      .expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Test Task');
  });

  it('should update a task', async () => {
    await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .expect(201);

    const res = await request(app)
      .put(`/api/tasks/1`)
      .send({ title: 'Updated Task', completed: true })
      .expect(200);

    expect(res.body.title).toBe('Updated Task');
    expect(res.body.completed).toBe(true);
  });

  it('should delete a task', async () => {
    await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task' })
      .expect(201);

    await request(app)
      .delete(`/api/tasks/1`)
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

// Adicionando testes para GET /tasks/:id
it('should fetch a task by ID', async () => {
  const newTask = await request(app)
    .post('/api/tasks')
    .send({ title: 'Find This Task' })
    .expect(201);
  
  const res = await request(app)
    .get(`/api/tasks/${newTask.body.id}`)
    .expect(200);
  
  expect(res.body.title).toBe('Find This Task');
  });
    
  it('should return 404 for non-existent task', async () => {
  const res = await request(app)
    .get('/api/tasks/9999')
    .expect(404);
  
  expect(res.body.error.message).toBe('Task not found');
  });
  
  it('should return 400 for invalid ID', async () => {
  const res = await request(app)
    .get('/api/tasks/invalid-id')
    .expect(400);
  
  expect(res.body.error.message).toBe('Id invalid');
  });
  
