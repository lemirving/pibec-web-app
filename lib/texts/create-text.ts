// lib/texts/create-text.ts
"use server";

import { db } from "@/db";
import { texts, files } from "@/db/schema";
import { type UploadedFile } from "@/lib/r2/upload-files";

type CreateTextInput = {
  title: string;
  theme: string;
  genre: typeof texts.$inferInsert["genre"];
  status: typeof texts.$inferInsert["status"];
  authorId: string;
  attachments: UploadedFile[];
};

export async function createText(data: CreateTextInput) {
    const [newText] = await db
    .insert(texts)
    .values({
      title: data.title,
      theme: data.theme,
      genre: data.genre,
      status: data.status,
      authorId: data.authorId,
    })
    .returning({ id: texts.id });

  if (data.attachments.length > 0) {
    await db.insert(files).values(
      data.attachments.map((file) => ({
        fileUrl: file.url,
        extension: file.name.split(".").pop() ?? "",
        authorId: data.authorId,
        textId: newText.id,
      }))
    );
  }

  return newText;
}