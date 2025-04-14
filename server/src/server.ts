import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import config from './config';
import notFound from './middleware/notFound';
import globalErrorHandler from './middleware/globarErrorHandler';
import authRoutes from './routes/auth.routes';
import notificationRoutes from './routes/notification.routes';
import fileUpload from 'express-fileupload';
import { authenticateSocket } from './middleware/authGuard';
import { io, app, server } from './utils/socket';

// middleware--
app.use(express.json());
app.use(cors({ origin: config.client_url, credentials: true }));
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
io.use(authenticateSocket);
// handling uncaught exceptions--
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Uncaught exception: ${err.stack}`);
  process.exit(1);
});

// mongodb connection--
mongoose
  .connect(config.mongo_uri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// routes--
app.get('/', (_req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notifications', notificationRoutes);
// not found middleware
app.use(notFound);
app.use(globalErrorHandler);
// server--
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

// unhandled promise rejection--
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shuting down the server due to unhandled promise rejection!`);

  server.close(() => {
    process.exit(1);
  });
});
