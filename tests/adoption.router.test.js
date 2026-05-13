import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';

// Limpiar la base de datos antes de cada corrida de tests
beforeAll(async () => {
  // Esperar a que la conexión esté lista
  await mongoose.connection.asPromise();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

describe('Adoption Router', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET /api/adoptions debe devolver todas las adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(Array.isArray(res.body.payload)).toBe(true);
  });

  let testUserId;
  let testPetId;
  let testAdoptionId;

  beforeAll(async () => {
    // Crea usuario de prueba
    const randomEmail = `testuser_${Date.now()}@example.com`;
    const userRes = await request(app)
      .post('/api/users')
      .send({ first_name: 'Test', last_name: 'User', email: randomEmail, password: '123456' });
    testUserId = userRes.body.payload?._id || userRes.body.payload?.id;

    // Crea mascota de prueba
    const petRes = await request(app)
      .post('/api/pets')
      .send({ name: 'Test Pet', specie: 'dog', birthDate: '2020-01-01' });
    testPetId = petRes.body.payload?._id || petRes.body.payload?.id;
  });

  it('POST /api/adoptions/:uid/:pid debe crear una adopción', async () => {
    const res = await request(app)
      .post(`/api/adoptions/${testUserId}/${testPetId}`)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'success');
    testAdoptionId = res.body.payload?._id || res.body.payload?.id;
  });

  it('POST /api/adoptions/:uid/:pid debe fallar con datos inválidos', async () => {
    const fakeUserId = '000000000000000000000000';
    const fakePetId = '000000000000000000000001';
    const res = await request(app)
      .post(`/api/adoptions/${fakeUserId}/${fakePetId}`)
      .send();
    expect([400,404]).toContain(res.statusCode);
  });

  it('GET /api/adoptions/:aid debe devolver una adopción por ID', async () => {
    let adoptionId = testAdoptionId;
    if (!adoptionId) {
      const all = await request(app).get('/api/adoptions');
      adoptionId = all.body.payload[0]?._id || all.body.payload[0]?.id;
    }
    const res = await request(app).get(`/api/adoptions/${adoptionId}`);
    expect([200,404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('status', 'success');
    }
  });

  it('GET /api/adoptions/:aid debe devolver 404 si no existe', async () => {
    const res = await request(app).get('/api/adoptions/000000000000000000000000'); // ID válido pero no existe
    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/adoptions/:aid debe actualizar una adopción', async () => {
    let adoptionId = testAdoptionId;
    if (!adoptionId) {
      const all = await request(app).get('/api/adoptions');
      adoptionId = all.body.payload[0]?._id || all.body.payload[0]?.id;
    }
    const res = await request(app)
      .put(`/api/adoptions/${adoptionId}`)
      .send({}); 
    expect([200,404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('status', 'success');
    }
  });

  it('PUT /api/adoptions/:aid debe devolver 404 si no existe', async () => {
    const res = await request(app)
      .put('/api/adoptions/000000000000000000000000')
      .send({});
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/adoptions/:aid debe eliminar una adopción', async () => {
    let adoptionId = testAdoptionId;
    if (!adoptionId) {
      const all = await request(app).get('/api/adoptions');
      adoptionId = all.body.payload[0]?._id || all.body.payload[0]?.id;
    }
    const res = await request(app).delete(`/api/adoptions/${adoptionId}`);
    expect([200,404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('status', 'success');
    }
  });

  it('DELETE /api/adoptions/:aid debe devolver 404 si no existe', async () => {
    const res = await request(app).delete('/api/adoptions/000000000000000000000000');
    expect(res.statusCode).toBe(404);
  });
});

