import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    await prisma.adminVariable.upsert({
        where: { id: 'singleton' },
        update: {},
        create: {
            id: 'singleton',
            serviceFee: 6,
            taxRate: 12,
            markupPercent: 10,
            currency: 'EUR',
            seasonalMultipliers: JSON.stringify([
                { city: 'Dakhla', multiplier: 1.2 },
                { city: 'Marrakesh', multiplier: 1.15 },
                { city: 'Agadir', multiplier: 1.1 }
            ])
        }
    });
    const trips = [
        {
            title: 'Dakhla: Kite & Desert',
            city: 'Dakhla',
            heroMedia: 'https://cdn.example.com/dakhla-hero.mp4',
            maxSeats: 20,
            tags: JSON.stringify(['kite', 'desert', 'lagoon']),
            packages: {
                create: [
                    { name: 'Economy', basePrice: 600, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Transfers', 'Camp']) },
                    { name: 'Adventure', basePrice: 950, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Kitesurf Lessons', '4x4 Dune Ride']) },
                    { name: 'Luxury', basePrice: 1500, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Lagoon Villa', 'Fine Dining']) }
                ]
            },
            itinerary: {
                create: [
                    { day: 1, title: 'Arrival & Sunset', description: 'Arrive and enjoy a desert sunset.' },
                    { day: 2, title: 'Kitesurfing', description: 'Full day kitesurf session on the lagoon.' },
                    { day: 3, title: 'Dune Safari', description: '4x4 desert ride and campfire dinner.' }
                ]
            },
            media: { create: [{ type: 'video', url: 'https://cdn.example.com/dakhla-1.mp4', tags: JSON.stringify(['hero']) }] }
        },
        {
            title: 'Marrakesh: Cultural Retreat',
            city: 'Marrakesh',
            heroMedia: 'https://cdn.example.com/marrakesh-hero.mp4',
            maxSeats: 20,
            tags: JSON.stringify(['culture', 'medina', 'spa']),
            packages: {
                create: [
                    { name: 'Economy', basePrice: 500, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Riad Stay', 'City Tour']) },
                    { name: 'Adventure', basePrice: 800, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Atlas Trip', 'Hammam']) },
                    { name: 'Luxury', basePrice: 1300, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Luxury Riad', 'Private Guide']) }
                ]
            },
            itinerary: {
                create: [
                    { day: 1, title: 'Souks & Jemaa el-Fnaa', description: 'Explore vibrant markets and square.' },
                    { day: 2, title: 'Majorelle Gardens', description: 'Visit gardens and museums.' },
                    { day: 3, title: 'Atlas Mountains', description: 'Day trip with lunch in the mountains.' }
                ]
            },
            media: { create: [{ type: 'video', url: 'https://cdn.example.com/marrakesh-1.mp4', tags: JSON.stringify(['hero']) }] }
        },
        {
            title: 'Agadir: Beach & Surf',
            city: 'Agadir',
            heroMedia: 'https://cdn.example.com/agadir-hero.mp4',
            maxSeats: 20,
            tags: JSON.stringify(['beach', 'surf', 'sun']),
            packages: {
                create: [
                    { name: 'Economy', basePrice: 450, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Hotel', 'Beach Pass']) },
                    { name: 'Adventure', basePrice: 750, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Surf Lessons', 'Sandboarding']) },
                    { name: 'Luxury', basePrice: 1200, seatsTotal: 20, seatsLeft: 20, inclusions: JSON.stringify(['Beachfront Suite', 'Fine Dining']) }
                ]
            },
            itinerary: {
                create: [
                    { day: 1, title: 'Beach Day', description: 'Relax and swim.' },
                    { day: 2, title: 'Surf Camp', description: 'Learn to surf at Taghazout.' },
                    { day: 3, title: 'Paradise Valley', description: 'Excursion with natural pools.' }
                ]
            },
            media: { create: [{ type: 'video', url: 'https://cdn.example.com/agadir-1.mp4', tags: JSON.stringify(['hero']) }] }
        }
    ];
    for (const t of trips) {
        await prisma.trip.create({ data: t });
    }
}
main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
