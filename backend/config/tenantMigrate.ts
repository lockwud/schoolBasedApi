import { execSync } from "child_process"
import { throwError } from "../src/middleware/errorHandler"
import { HttpStatus } from "../src/utils/http-status"

export const migrateTenantDb = async (dbUrl: string)=>{
    try{
        execSync(
            `TENANT_DATABASE_URL="${dbUrl}" npx prisma db push --schema=prisma/tenants/schema.prisma`,
            { stdio: "inherit" }
          )
          
    }catch(err){
        throwError(HttpStatus.UNPROCESSABLE_ENTITY, "Migration failed")
    }
    
}
