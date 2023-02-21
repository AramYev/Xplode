import express from 'express';
import morgan from 'morgan';
import userRouter from './user/router.js';
import notebookRouter from './notebook/router.js';
import authRouter from './auth/router.js';

const app = express();

app.use(express.json());

app.use(morgan('combined'));

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/notebook', notebookRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const errRespond = {
    location: err.location,
    error: [{ msg: err.message }],
  };
  res.status(err.statusCode).send(errRespond);
});

export default app;
