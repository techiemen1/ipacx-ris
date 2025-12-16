import { db } from '../src/config/database';

beforeAll(async () => {
  // Ensure DB is reachable
  await db.query('SELECT 1');
});

afterAll(async () => {
  await db.end();
});
