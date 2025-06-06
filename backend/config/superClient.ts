import { PrismaClient as SuperClient} from '../prisma/generated/super';

const superDB = new SuperClient();
export default superDB;

