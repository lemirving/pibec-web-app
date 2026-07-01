// lib/r2/upload-files.ts
import { PendingFile } from "@/components/submit/file-attachments";

export type UploadedFile = {
  url: string;
  key: string;
  name: string;
  size: number;
};

export async function uploadFiles(pendingFiles: PendingFile[]): Promise<UploadedFile[]> {
  return Promise.all(
    pendingFiles.map(async ({ file, name, size }) => {
      const presignRes = await fetch("/api/uploads/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      if (!presignRes.ok) {
        const data = await presignRes.json();
        throw new Error(data.error ?? `Erro ao preparar upload de "${name}"`);
      }

      const { uploadUrl, publicUrl, key } = await presignRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error(`Falha ao enviar "${name}"`);
      }

      return { url: publicUrl, key, name, size };
    })
  );
}