import { Router } from 'express';
import { prisma } from '../lib/db.js';

const router = Router();

router.get('/metrics', async (_req, res) => {
  const [trips, bookings, activeSeats] = await Promise.all([
    prisma.trip.count(),
    prisma.booking.count(),
    prisma.package.aggregate({ _sum: { seatsLeft: true } })
  ]);
  res.json({ trips, bookings, activeSeats: activeSeats._sum.seatsLeft ?? 0 });
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

export default router;
