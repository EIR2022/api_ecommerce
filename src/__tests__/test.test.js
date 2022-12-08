const supertest = require('supertest');
const app = require('../app');

describe('prueba1', () => {
  describe('prueba2', () => {
    describe('prueba3', () => {
      it('prueba4', async () => {
        await supertest(app).get('/').expect(200);
      });
    });
  });
});
