import { Router } from 'express';
import { prisma } from '../lib/db.js';

const router = Router();

router.get('/', async (_req, res) => {
  const trips = await prisma.trip.findMany({ include: { packages: true, itinerary: true, media: true } });
  res.json(trips);
});

router.get('/:id', async (req, res) => {
  const trip = await prisma.trip.findUnique({
    where: { id: req.params.id },
    include: { packages: true, itinerary: true, media: true }
  });
  if (!trip) return res.status(404).json({ error: 'Not found' });
  res.json(trip);
});

export default router;
