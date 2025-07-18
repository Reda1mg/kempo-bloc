// _tests_/age-group-route.test.ts
import { GET } from '../app/api/age-group/route';
import { prisma } from '../lib/prisma';

// Mock prisma to avoid real DB calls
jest.mock('../lib/prisma', () => ({
  prisma: {
    ageGroup: {
      findMany: jest.fn(),
    },
  },
}));

describe('/api/age-group route', () => {
  it('returns age groups with status 200', async () => {
    // Arrange: mock the data returned by Prisma
    (prisma.ageGroup.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: 'U12' },
      { id: 2, name: 'U18' },
    ]);

    // Act
    const res: any = await GET();

    // Assert
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual([
      { id: 1, name: 'U12' },
      { id: 2, name: 'U18' },
    ]);
  });

  it('returns 500 on error', async () => {
    // Arrange: mock Prisma to throw an error
    (prisma.ageGroup.findMany as jest.Mock).mockRejectedValue(new Error('fail'));

    const res: any = await GET();

    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json).toEqual({ message: 'Erreur de récupération' });
  });
});
