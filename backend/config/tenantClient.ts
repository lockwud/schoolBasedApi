import { PrismaClient } from '../prisma/generated/tenant'; // path to the generated base client

// Cache to prevent PrismaClient re-instantiation
const tenantClientCache: Record<string, PrismaClient> = {};

export function getTenantClient(databaseUrl: string): PrismaClient {
  if (tenantClientCache[databaseUrl]) {
    return tenantClientCache[databaseUrl];
  }

  const client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  tenantClientCache[databaseUrl] = client;
  return client;
}
