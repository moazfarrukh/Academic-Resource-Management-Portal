const request = require('supertest');
const { app } = require('../app');
const User = require('../models/user');

describe('Auth Controller', () => {
  const userData = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  };

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /register', () => {
    test('should register a new user', async () => {
      const response = await request(app)
        .post('/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('Registration successful');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.firstName).toBe(userData.firstName);
      expect(response.body.user.lastName).toBe(userData.lastName);

      const user = await User.findOne({ email: userData.email });
      expect(user).toBeTruthy();
    });
  });

  describe('POST /login', () => {
    beforeEach(async () => {
      await User.create(userData);
    });

    test('should log in an existing user with correct credentials', async () => {
      const response = await request(app)
        .post('/login')
        .send({ email: userData.email, password: userData.password })
        .expect(200);

      expect(response.body.token).toBeTruthy();
    });
  });
});
