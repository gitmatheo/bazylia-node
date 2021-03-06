import { newToken, verifyToken, signup, login, protect } from '../auth.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../../business/user/user.models.js';
import dotenv from 'dotenv';
dotenv.config();

describe('Authentication:', () => {
  describe('newToken', () => {
    test('creates new jwt from user', () => {
      const id = 123;
      const token = newToken({ id });

      const user = jwt.verify(token, process.env.JWT_SECRET);

      expect(user.id).toBe(id);
    });
  });

  describe('verifyToken', () => {
    test('validates jwt and returns payload', async () => {
      const id = 1234;
      const token = jwt.sign({ id }, process.env.JWT_SECRET);
      const user = await verifyToken(token);
      expect(user.id).toBe(id);
    });
  });

  describe('signup', () => {
    test('requires login and password', async () => {
      expect.assertions(2);

      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(400);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await signup(req, res);
    });

    test('creates user and and sends new token from user', async () => {
      expect.assertions(2);
      const req = { body: { login: 'adminek', password: 'adminek123' } };
      const res = {
        status(status) {
          expect(status).toBe(201);
          return this;
        },
        async send(result) {
          let user = await verifyToken(result.token);
          user = await User.findById(user.id)
            .lean()
            .exec();
          expect(user.login).toBe('adminek');
        },
      };
      await signup(req, res);
    });
  });

  describe('login', () => {
    test('requires login and password', async () => {
      expect.assertions(2);

      const req = { body: {} };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await login(req, res);
    });

    test('user must be real', async () => {
      expect.assertions(2);

      const req = { body: { login: 'admin', password: 'admin123' } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await login(req, res);
    });

    test('passwords must match', async () => {
      expect.assertions(2);

      await User.create({
        login: 'admin',
        password: 'admin123',
      });

      const req = { body: { login: 'admin', password: 'wrong' } };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        send(result) {
          expect(typeof result.message).toBe('string');
        },
      };

      await login(req, res);
    });

    test('creates new token', async () => {
      expect.assertions(2);
      const fields = {
        login: 'admin',
        password: 'admin123',
      };
      const savedUser = await User.create(fields);

      const req = { body: fields };
      const res = {
        status(status) {
          //TODO FAILING
          expect(status).toBe(201);
          return this;
        },
        async send(result) {
          let user = await verifyToken(result.token);
          user = await User.findById(user.id)
            .lean()
            .exec();
          expect(user._id.toString()).toBe(savedUser._id.toString());
        },
      };

      await login(req, res);
    });
  });

  describe('protect', () => {
    test('looks for Bearer token in headers', async () => {
      expect.assertions(2);

      const req = { headers: {} };
      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await protect(req, res);
    });

    test('token must have correct prefix', async () => {
      expect.assertions(2);

      let req = { headers: { authorization: newToken({ id: '123sfkj' }) } };
      let res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await protect(req, res);
    });

    test('must be a real user', async () => {
      const token = `Bearer ${newToken({ id: mongoose.Types.ObjectId() })}`;
      const req = { headers: { authorization: token } };

      const res = {
        status(status) {
          expect(status).toBe(401);
          return this;
        },
        end() {
          expect(true).toBe(true);
        },
      };

      await protect(req, res);
    });

    test('finds user form token and passes on', async () => {
      const user = await User.create({
        login: 'admin',
        password: 'admin123',
      });
      const token = `Bearer ${newToken(user)}`;
      const req = { headers: { authorization: token } };

      const next = () => {};
      await protect(req, {}, next);
      expect(req.user._id.toString()).toBe(user._id.toString());
      expect(req.user).not.toHaveProperty('password');
    });
  });
});
