import { Router } from 'express';
import { prisma } from '../lib/db.js';

const router = Router();

router.get('/metrics', async (_req, res) => {
  const [trips, bookings, activeSeats, customTrips] = await Promise.all([
    prisma.trip.count(),
    prisma.booking.count(),
    prisma.package.aggregate({ _sum: { seatsLeft: true } }),
    prisma.customTrip.count()
  ]);
  res.json({ trips, bookings, activeSeats: activeSeats._sum.seatsLeft ?? 0, customTrips });
});

router.get('/pricing', async (_req, res) => {
  const vars = await prisma.adminVariable.findFirst();
  res.json(vars);
});

router.post('/pricing', async (req, res) => {
  const { serviceFee, taxRate, markupPercent, currency, seasonalMultipliers } = req.body;
  const vars = await prisma.adminVariable.upsert({
    where: { id: 'singleton' },
    update: { serviceFee, taxRate, markupPercent, currency, seasonalMultipliers },
    create: { id: 'singleton', serviceFee, taxRate, markupPercent, currency, seasonalMultipliers }
  });
  res.json(vars);
});

// List all custom trips for admin
router.get('/custom-trips', async (_req, res) => {
  const list = await prisma.customTrip.findMany({
    include: { user: true },
    orderBy: { id: 'desc' }
  });
  res.json(list);
});

// List all bookings for admin with relations
router.get('/bookings', async (_req, res) => {
  const list = await prisma.booking.findMany({
    include: { user: true, trip: true, package: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(list);
});

export default router;
