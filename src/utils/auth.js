import { User } from '../business/user/user.models.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

export const newToken = user => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const signup = async (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.status(400).send({ message: 'need login and password' });
  }

  try {
    const user = await User.create(req.body);
    const token = newToken(user);

    return res.status(201).send({ token });
  } catch (e) {
    return res.status(500).end();
  }
};

export const login = async (req, res) => {
  if (!req.body.login || !req.body.password) {
    return res.status(401).send({ message: 'need login and password' });
  }

  const invalid = { message: 'Invalid login and passoword combination' };

  try {
    const user = await User.findOne({ login: req.body.login })
      .select('login password roles')
      .exec();

    if (!user) {
      return res.status(401).send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send(invalid);
    }

    const token = newToken(user);

    return (
      res
        .status(201)
        // .cookie('access_token', token, {
        //   expires: new Date(Date.now() + 3600000) // cookie will be removed after 1 hour
        // })
        .send({
          token: token,
          username: user.login,
          roles: user.roles,
        })
    );
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie('access_token', {
        expires: new Date(Date.now() + 3600000),
      })
      .send('success');
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

// export default {
//   newToken,
//   verifyToken,
//   signup,
//   login,
//   logout,
//   protect
// };
