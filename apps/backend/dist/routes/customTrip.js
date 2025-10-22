import { Router } from 'express';
import { prisma } from '../lib/db.js';
const router = Router();
router.get('/', async (req, res) => {
    const userId = String(req.query.userId || '');
    if (!userId)
        return res.status(400).json({ error: 'userId required' });
    const trips = await prisma.customTrip.findMany({ where: { userId } });
    res.json(trips);
});
router.get('/:id', async (req, res) => {
    const ct = await prisma.customTrip.findUnique({ where: { id: req.params.id } });
    if (!ct)
        return res.status(404).json({ error: 'Not found' });
    res.json(ct);
});
router.post('/', async (req, res) => {
    const { userId, cities, days, guests = 2 } = req.body;
    if (!userId || !Array.isArray(cities) || !days)
        return res.status(400).json({ error: 'Invalid payload' });
    const vars = await prisma.adminVariable.findFirst();
    const base = cities.length * 200 + days * 100;
    const seasonalMultiplier = 1 + (cities.includes('Marrakesh') ? 0.15 : 0);
    const serviceFee = (vars?.serviceFee ?? 5) / 100;
    const markup = (vars?.markupPercent ?? 8) / 100;
    const tax = (vars?.taxRate ?? 10) / 100;
    const guestsComponent = Math.max(0, guests - 1) * base * 0.2;
    const subtotal = (base + guestsComponent) * seasonalMultiplier;
    const total = Math.round((subtotal * (1 + serviceFee + markup)) * (1 + tax) * 100) / 100;
    const created = await prisma.customTrip.create({ data: { userId, cities: JSON.stringify(cities), days, totalPrice: total, status: 'draft' } });
    res.json(created);
});
router.post('/:id', async (req, res) => {
    const { cities, days } = req.body;
    const updated = await prisma.customTrip.update({ where: { id: req.params.id }, data: { cities: cities ? JSON.stringify(cities) : undefined, days } });
    res.json(updated);
});
router.post('/:id/confirm', async (req, res) => {
    const updated = await prisma.customTrip.update({ where: { id: req.params.id }, data: { status: 'confirmed' } });
    res.json(updated);
});
export default router;
