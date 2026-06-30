// lib/authors.ts
"use server";

import { db } from "@/db";
import { authors } from "@/db/schema";
import { ilike, eq, and } from "drizzle-orm";


type NewAuthor = typeof authors.$inferInsert;

export async function createAuthor(
  data: Pick<NewAuthor, "name" | "grade" | "classroomId">
) {
  const existingAuthor = await db
    .select({ id: authors.id })
    .from(authors)
    .where(
      and(
        ilike(authors.name, data.name),
        eq(authors.classroomId, data.classroomId)
      )
    )
    .limit(1);

  if (existingAuthor.length > 0) {
    throw new Error("Este aluno já está cadastrado nessa turma.");
  }

  const [newAuthor] = await db
    .insert(authors)
    .values(data)
    .returning({ id: authors.id, name: authors.name, grade: authors.grade });

  return newAuthor;
}