import { db } from "@/db"
import {authors, classrooms} from "@/db/schema"
import { eq , desc} from "drizzle-orm";


export async function getAllAuthors() {
  return await db 
    .select({
      id: authors.id,
      name: authors.name,
      classroom: classrooms.name,
      educationLevel: authors.educationLevel,
      grade: authors.grade,
      createdAt: authors.createdAt,
    })
    .from(authors)
    .leftJoin(classrooms, eq(authors.classroomId, classrooms.id))
    
}