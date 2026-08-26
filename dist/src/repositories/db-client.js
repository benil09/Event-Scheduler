import { prisma } from "../config/database.js";
export function getDbClient(db) {
    return db ?? prisma;
}
//# sourceMappingURL=db-client.js.map