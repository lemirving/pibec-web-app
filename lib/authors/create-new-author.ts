// lib/authors.ts
"use server";

import { db } from "@/db";
import { authors } from "@/db/schema";

type NewAuthor = typeof authors.$inferInsert;

export async function createAuthor(data: Pick<NewAuthor, "name" | "grade" | "classroomId" | "educationLevel">) {
  const [newAuthor] = await db
    .insert(authors)
    .values(data)
    .returning({ id: authors.id, name: authors.name, grade: authors.grade });

  return newAuthor;
}