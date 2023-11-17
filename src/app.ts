import dotenv from 'dotenv';
dotenv.config();
import './database/config';
import CustomError from './helpers/error';
import express, { Request, Response, NextFunction } from 'express';

const app = express();

const PORT = process.env.PORT || 3002;
import cors from 'cors';

// routes
import authRouter from './routes/auth';
import usersRouter from './routes/user';
import swaggerDocs from './helpers/swagger';



// config
app.use(cors());
app.use(express.json());

// end points
app.use('/api/auth', authRouter);
app.use('/api/user', usersRouter);

// error handling middleware - must be last in the chain of middleware (after all other middleware)
app.use(
  (err: CustomError, _req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const status = err instanceof SyntaxError ? 400 : err.statusCode || 500; // Consider syntax errors as 400 Bad Request
    const message = err.message || 'Internal Server Error :(';
    const data = err.hasOwnProperty('data') ? err.data : undefined; // Access data directly if it exists

    res.status(status).json({ message, data });
  },
);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
  swaggerDocs(app, PORT);
});
