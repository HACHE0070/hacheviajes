import Redis from 'ioredis';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
export const redis = new Redis(redisUrl);
export async function withSeatLock(key, ttlMs, fn) {
    const lockKey = `lock:${key}`;
    const acquired = await redis.set(lockKey, '1', 'PX', ttlMs, 'NX');
    if (!acquired) {
        throw new Error('Seat lock in progress, please retry');
    }
    try {
        return await fn();
    }
    finally {
        await redis.del(lockKey);
    }
}
