import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { prisma } from './lib/db.js';
import { redis } from './lib/redis.js';
import tripsRouter from './routes/trips.js';
import bookingsRouter from './routes/bookings.js';
import pricingRouter from './routes/pricing.js';
import adminRouter from './routes/admin.js';
import customTripRouter from './routes/customTrip.js';

const app = express();
app.use(cors({ origin: '*'}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/trips', tripsRouter);
app.use('/bookings', bookingsRouter);
app.use('/pricing', pricingRouter);
app.use('/admin', adminRouter);
app.use('/custom-trip', customTripRouter);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.join('metrics');
});

export function emitSeatUpdate(tripId: string) {
  io.emit('seat_update', { tripId });
}

export function emitMetricsUpdate(metrics: any) {
  io.to('metrics').emit('metrics_update', metrics);
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
