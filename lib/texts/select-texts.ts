
import { db } from "@/db"
import {authors, files, texts} from "@/db/schema"
import { eq , desc} from "drizzle-orm";

export async function getFeaturedTexts() {
  return await db
    .select({
      id: texts.id,
      title: texts.title,      
      content: texts.content,
      genre: texts.genre,
      status: texts.status,
      createdAt: texts.createdAt,
      authorName: authors.name,
      authorGrade: authors.grade,
      fileExtension: files.extension, // 1. ← Adicionamos a coluna aqui
    })
    .from(texts)
    .leftJoin(authors, eq(texts.authorId, authors.id))
    .leftJoin(files, eq(files.textId, texts.id)); // 2. ← Adicionamos o join essencial aqui!
}
export async function getRecentlyUploaded() {
  return await db
    .select({
      id: texts.id,
      title: texts.title,
      content: texts.content,
      genre: texts.genre,
      status: texts.status,
      createdAt: texts.createdAt,
      authorName: authors.name,
      authorGrade: authors.grade,
      fileExtension: files.extension,  
    })
    .from(texts)
    .leftJoin(authors, eq(texts.authorId, authors.id))
    .leftJoin(files, eq(files.textId, texts.id))  
    .orderBy(desc(texts.createdAt))
    .limit(4);
}