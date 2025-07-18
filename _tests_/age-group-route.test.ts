// _tests_/age-group-route.test.ts
import { GET } from '../app/api/age-group/route';
import { prisma } from '../lib/prisma';

jest.mock('../lib/prisma', () => ({
  prisma: {
    ageGroup: {
      findMany: jest.fn(),
    },
  },
}));

describe('/api/age-group route', () => {
  it('returns age groups with status 200', async () => {
    prisma.ageGroup.findMany.mockResolvedValue([
      { id: 1, name: 'U12' },
      { id: 2, name: 'U18' },
    ]);

    const res: any = await GET();

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual([
      { id: 1, name: 'U12' },
      { id: 2, name: 'U18' },
    ]);
  });

  it('returns 500 on error', async () => {
    prisma.ageGroup.findMany.mockRejectedValue(new Error('fail'));

    const res: any = await GET();

    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json).toEqual({ message: 'Erreur de récupération' });
  });
});
