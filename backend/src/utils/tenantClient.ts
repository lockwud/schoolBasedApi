import { PrismaClient } from '../../prisma/generated/tenant';

export function getTenantClient(dbUrl: string) {
  return new PrismaClient({
    datasources: {
      db: { url: dbUrl },
    },
  });
}
