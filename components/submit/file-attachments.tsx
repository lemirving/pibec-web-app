// components/forms/file-attachments.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt";
const MAX_FILE_SIZE_MB = 13;

export type PendingFile = {
  file: File;
  name: string;
  size: number;
  previewId: string; 
};

interface FileAttachmentsProps {
  files: PendingFile[];
  onChange: (files: PendingFile[]) => void;
}

export function FileAttachments({ files, onChange }: FileAttachmentsProps) {
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFilesSelected(selectedFiles: FileList | null) {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setError(null);

    const newFiles: PendingFile[] = [];

    for (const file of Array.from(selectedFiles)) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`"${file.name}" excede o limite de ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }

      newFiles.push({
        file,
        name: file.name,
        size: file.size,
        previewId: crypto.randomUUID(),
      });
    }

    onChange([...files, ...newFiles]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleRemove(previewId: string) {
    onChange(files.filter((f) => f.previewId !== previewId));
  }

  function formatSize(bytes: number) {
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
      >
        <Upload className="h-6 w-6 text-muted-foreground" />
        <p className="text-base text-muted-foreground">
          Clique para anexar arquivos (PDF, Word ou TXT)
        </p>
        <p className="text-sm text-muted-foreground">
          Máximo {MAX_FILE_SIZE_MB}MB por arquivo
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          multiple
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.previewId}
              className="flex items-center justify-between rounded-md border px-3 py-2"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-base">{file.name}</span>
                <span className="text-sm text-muted-foreground shrink-0">
                  ({formatSize(file.size)})
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(file.previewId)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}