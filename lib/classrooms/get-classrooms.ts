
import { db } from "@/db"
import { classrooms} from "@/db/schema"
import { eq , desc} from "drizzle-orm";

export async function getAllClassrooms() {
  return await db
    .select({
      id: classrooms.id,
      name: classrooms.name,      
    })
    .from(classrooms)
    }