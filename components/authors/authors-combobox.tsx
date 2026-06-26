// components/forms/author-combobox.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UserPlus, Check } from "lucide-react";
import { createAuthor } from "@/lib/authors/create-new-author";
import { gradeEnum, type Grade } from "@/db/schema";

type Author = {
  id: string;
  name: string;
  grade: string;
};

type Classroom = {
  id: string;
  name: string;
};

interface AuthorComboboxProps {
  value: string; // authorId selecionado
  onChange: (authorId: string) => void;
  classrooms: Classroom[]; // passado pelo componente pai
}

const gradeLabels: Record<Grade, string> = {
  "6_fundamental": "6º Ano - Fundamental",
  "7_fundamental": "7º Ano - Fundamental",
  "8_fundamental": "8º Ano - Fundamental",
  "9_fundamental": "9º Ano - Fundamental",
  "1_medio": "1º Ano - Médio",
  "2_medio": "2º Ano - Médio",
  "3_medio": "3º Ano - Médio",
};

export function AuthorCombobox({ value, onChange, classrooms }: AuthorComboboxProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Author[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedAuthor, setSelectedAuthor] = React.useState<Author | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/authors?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Erro ao buscar autores", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  function handleSelect(author: Author) {
    setSelectedAuthor(author);
    onChange(author.id);
    setQuery("");
    setResults([]);
  }

  function handleClear() {
    setSelectedAuthor(null);
    onChange("");
  }

  return (
    <div className="space-y-2">
      {selectedAuthor ? (
        <div className="flex items-center justify-between rounded-md border px-3 py-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm">
              {selectedAuthor.name} — {selectedAuthor.grade}
            </span>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
            Trocar
          </Button>
        </div>
      ) : (
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar aluno por nome..."
              autoComplete="off"
            />

            {query && (
              <ul className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md max-h-60 overflow-auto">
                {loading && (
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    Buscando...
                  </li>
                )}

                {!loading && results.length === 0 && (
                  <li className="px-3 py-2 text-sm text-muted-foreground">
                    Nenhum aluno encontrado.
                  </li>
                )}

                {!loading &&
                  results.map((author) => (
                    <li
                      key={author.id}
                      onClick={() => handleSelect(author)}
                      className="px-3 py-2 text-sm hover:bg-muted cursor-pointer"
                    >
                      {author.name} — {author.grade}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setDialogOpen(true)}
            title="Adicionar novo aluno"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <NewAuthorDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        classrooms={classrooms}
        onCreated={(author) => {
          handleSelect(author);
          setDialogOpen(false);
        }}
      />
    </div>
  );
}

// ---- Mini formulário pra criar novo aluno ----

function NewAuthorDialog({
  open,
  onOpenChange,
  onCreated,
  classrooms,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (author: Author) => void;
  classrooms: Classroom[];
}) {
  const [name, setName] = React.useState("");
  const [grade, setGrade] = React.useState<Grade | "">("");
  const [classroomId, setClassroomId] = React.useState("");
  const [educationLevel, setEducationLevel] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleCreate() {
    if (!name || !grade || !classroomId || !educationLevel) {
      setError("Preencha todos os campos.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const newAuthor = await createAuthor({
        name,
        grade,
        classroomId,
        educationLevel,
      });

      onCreated(newAuthor);
      setName("");
      setGrade("");
      setClassroomId("");
      setEducationLevel("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo aluno</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <Label htmlFor="new-author-name">Nome</Label>
            <Input
              id="new-author-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo do aluno"
            />
          </div>

          <div>
            <Label htmlFor="new-author-grade">Série</Label>
            <select
              id="new-author-grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as Grade)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Selecione a série
              </option>
              {gradeEnum.enumValues.map((g) => (
                <option key={g} value={g}>
                  {gradeLabels[g]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="new-author-classroom">Turma</Label>
            <select
              id="new-author-classroom"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Selecione a turma
              </option>
              {classrooms.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="new-author-education-level">Nível de ensino</Label>
            <select
              id="new-author-education-level"
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Selecione o nível
              </option>
              <option value="fundamental">Fundamental</option>
              <option value="medio">Médio</option>
            </select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleCreate} disabled={submitting}>
            {submitting ? "Criando..." : "Criar aluno"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}