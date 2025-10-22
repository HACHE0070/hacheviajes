import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { calculatePrice } from '../lib/pricing.js';

const router = Router();

router.post('/calc', async (req, res) => {
  const { packageId, guests } = req.body as { packageId: string; guests: number };
  const pkg = await prisma.package.findUnique({ where: { id: packageId }, include: { trip: true } });
  if (!pkg) return res.status(404).json({ error: 'Package not found' });

  const vars = await prisma.adminVariable.findFirst();
  const seasonal = (Array.isArray(vars?.seasonalMultipliers)
    ? (vars!.seasonalMultipliers as any[]).find((m: any) => m.city === pkg.trip.city)?.multiplier
    : 1) ?? 1;
  const breakdown = calculatePrice({
    basePrice: pkg.basePrice,
    guests,
    serviceFeePercent: vars?.serviceFee ?? 5,
    taxRatePercent: vars?.taxRate ?? 10,
    markupPercent: vars?.markupPercent ?? 8,
    seasonalMultiplier: seasonal,
    currency: vars?.currency ?? 'EUR'
  });

  res.json(breakdown);
});

export default router;
