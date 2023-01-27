/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const supertest = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const createServer = require('../../utils/server');

const app = createServer();

describe('auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe('POST api/v1/auth/signup', () => {
    test('should fill in the empty fields', async () => {
      await supertest(app).post('/api/v1/auth/signup').expect(422);
    });

    test('should enter mail', async () => {
      await supertest(app)
        .post('/api/v1/auth/signup')
        .send({ password: 'testpassword' })
        .expect(422);
    });

    test('should enter a valid password', async () => {
      await supertest(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'testemail@gmail.com' })
        .expect(422);
    });

    test('should create a usuario', async () => {
      await supertest(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'test@gmail.com', password: 'testpassword' })
        .expect(201);
    });
  });

  describe('POST api/v1/auth/signup/validate-code', () => {
    test('should return a 404 there is no mail', async () => {
      const response = await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test1@gmail.com', codeverification: '1234' })
        .expect(404);

      expect(response._body.error.message).toBe('El correo no esta registrado');
    });

    test('should return a 404 the code is not correct', async () => {
      await supertest(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'test2@gmail.com', password: 'testpassword' })
        .expect(201);

      const response = await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test2@gmail.com', codeverification: '1234' })
        .expect(404);

      expect(response._body.error.message).toBe(
        'Codigo incorrecto intenta de nuevo',
      );
    });

    test('should return a 404', async () => {
      await supertest(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'test3@gmail.com', password: 'testpassword' })
        .expect(201);

      await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test3@gmail.com', codeverification: '1234' })
        .expect(404);
      await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test3@gmail.com', codeverification: '1234' })
        .expect(404);
      await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test3@gmail.com', codeverification: '1234' })
        .expect(404);
      await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test3@gmail.com', codeverification: '1234' })
        .expect(404);
      await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test3@gmail.com', codeverification: '1234' })
        .expect(404);

      const response = await supertest(app)
        .post('/api/v1/auth/signup/validate-code')
        .send({ email: 'test3@gmail.com', codeverification: '1234' })
        .expect(410);

      expect(response._body.error.message).toBe(
        'Intentaste mas de 5 veces, registrate nuevamente',
      );
    });
  });
});
