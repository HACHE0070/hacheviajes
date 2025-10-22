import { Router } from 'express';
import { prisma } from '../lib/db.js';
import { Prisma } from '@prisma/client';
import { withSeatLock } from '../lib/redis.js';
import { emitSeatUpdate, emitMetricsUpdate } from '../index.js';
import PDFDocument from 'pdfkit';

const router = Router();

router.post('/', async (req, res) => {
  const { userId, tripId, packageId, guests } = req.body as {
    userId: string; tripId: string; packageId: string; guests: any[];
  };

  try {
    const booking = await withSeatLock(`trip:${tripId}`, 5000, async () => {
      const pkg = await prisma.package.findUnique({ where: { id: packageId } });
      if (!pkg) throw new Error('Package not found');
      if (pkg.seatsLeft < guests.length) throw new Error('Not enough seats');

      const created = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        const updatedPkg = await tx.package.update({
          where: { id: packageId },
          data: { seatsLeft: { decrement: guests.length } }
        });
        const createdBooking = await tx.booking.create({
          data: {
            userId, tripId, packageId, guests: JSON.stringify(guests),
            totalPrice: 0,
            paymentStatus: 'pending'
          }
        });
        return { updatedPkg, createdBooking };
      });
      return created.createdBooking;
    });

    emitSeatUpdate(tripId);
    res.json({ booking });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/:id/invoice', async (req, res) => {
  const booking = await prisma.booking.findUnique({ where: { id: req.params.id }, include: { trip: true, package: true, user: true } });
  if (!booking) return res.status(404).json({ error: 'Not found' });
  res.setHeader('Content-Type', 'application/pdf');
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(20).text('Hache Viajes - Booking Invoice');
  doc.moveDown();
  doc.fontSize(12).text(`Booking: ${booking.id}`);
  doc.text(`Customer: ${booking.user.name} (${booking.user.email})`);
  doc.text(`Trip: ${booking.trip.title} - Package: ${booking.package.name}`);
  doc.text(`Total: €${booking.totalPrice}`);
  doc.text(`Status: ${booking.paymentStatus}`);
  doc.end();
});

export default router;
