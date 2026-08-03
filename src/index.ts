import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config';
import { connectDB } from './config/database';
import { initializeSockets } from './sockets';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import authRoutes from './modules/auth/auth.routes';
import requestsRoutes from './modules/requests/requests.routes';
import inventoryRoutes from './modules/inventory/inventory.routes';
import searchRoutes from './modules/search/search.routes';
import usersRoutes from './modules/users/users.routes';
import appointmentsRoutes from './modules/appointments/appointments.routes';
import donationsRoutes from './modules/donations/donations.routes';
import notificationsRoutes from './modules/notifications/notifications.routes';
import adminRoutes from './modules/admin/admin.routes';
import volunteerRoutes from './modules/volunteer/volunteer.routes';
import reportsRoutes from './modules/reports/reports.routes';

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = initializeSockets(server);

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(apiLimiter);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/requests', requestsRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/appointments', appointmentsRoutes);
app.use('/api/v1/donations', donationsRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/volunteer', volunteerRoutes);
app.use('/api/v1/reports', reportsRoutes);

// Basic health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = config.port || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${config.env} mode on port ${PORT}`);
});

export { app, server };
