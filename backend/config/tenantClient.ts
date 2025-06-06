import { PrismaClient, PrismaClient as tenantClient} from '../prisma/generated/tenant'; // path to the generated base client

// Cache to prevent PrismaClient re-instantiation
const tenantClientCache: Record<string, PrismaClient> = {};

export function getTenantClient(databaseUrl: string): PrismaClient {
  if (tenantClientCache[databaseUrl]) {
    return tenantClientCache[databaseUrl];
  }

  const tenantDB = new tenantClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  tenantClientCache[databaseUrl] = tenantDB;
  return tenantDB;
}
