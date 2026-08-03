import { Server } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { TokenPayload } from '@life-for-all/types';
import { logger } from '../utils/logger';

export const initializeSockets = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: config.clientUrl,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Authentication middleware for sockets
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret) as TokenPayload;
      socket.data.user = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  const notificationsNamespace = io.of('/notifications');
  notificationsNamespace.on('connection', (socket) => {
    const user = socket.data.user;
    logger.info(`User ${user.userId} connected to /notifications namespace`);
    
    // Join a room specific to the user
    socket.join(user.userId);
    
    socket.on('disconnect', () => {
      logger.info(`User ${user.userId} disconnected from /notifications namespace`);
    });
  });

  const requestsNamespace = io.of('/requests');
  requestsNamespace.on('connection', (socket) => {
    logger.info(`Client connected to /requests namespace`);
    
    socket.on('joinRequest', (requestId) => {
      socket.join(requestId);
    });
    
    socket.on('leaveRequest', (requestId) => {
      socket.leave(requestId);
    });
  });

  return io;
};
