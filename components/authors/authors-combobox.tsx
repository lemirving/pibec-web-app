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
  grade: Grade;
};

type Classroom = {
  id: string;
  name: string;
};

interface AuthorComboboxProps {
  value: string; 
  onChange: (authorId: string) => void;
  classrooms: Classroom[];
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
    <div className="space-y-2 w-full">
      {selectedAuthor ? (
        /* Card de selecionado aumentado para text-base e h-12 equivalente */
        <div className="flex h-12 items-center justify-between rounded-md border px-3 text-base">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            <span className="text-base font-medium">
              {selectedAuthor.name} ({gradeLabels[selectedAuthor.grade]})
            </span>
          </div>
          <Button type="button" variant="ghost" size="sm" className="text-base" onClick={handleClear}>
            Trocar
          </Button>
        </div>
      ) : (
        <div className="relative flex gap-3 w-full">
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar aluno por nome..."
              autoComplete="off"
              className="h-12 text-base" /* Aumentado */
            />

            {query && (
              <ul className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md max-h-60 overflow-auto">
                {loading && (
                  <li className="px-3 py-3 text-base text-muted-foreground">
                    Buscando...
                  </li>
                )}

                {!loading && results.length === 0 && (
                  <li className="px-3 py-3 text-base text-muted-foreground">
                    Nenhum aluno encontrado.
                  </li>
                )}

                {!loading &&
                  results.map((author) => (
                    <li
                      key={author.id}
                      onClick={() => handleSelect(author)}
                      className="px-3 py-3 text-base hover:bg-muted cursor-pointer" /* Aumentado padding e texto */
                    >
                      {author.name} ({gradeLabels[author.grade]})
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* O BOTÃO AUMENTADO AQUI */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setDialogOpen(true)}
            title="Adicionar novo aluno"
            className="h-12 px-4 text-base flex gap-2 font-medium shrink-0" 
          >
            <UserPlus className="h-5 w-5" /> 
            <span>Novo Aluno</span>
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
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Removido o educationLevel daqui já que ele foi retirado dos campos visíveis abaixo
  async function handleCreate() {
  if (!name || !grade || !classroomId) {
    setError("Preencha todos os campos.");
    return;
  }

  setSubmitting(true);
  setError(null);

  try {
    const newAuthor = await createAuthor({ name, grade, classroomId });

    onCreated(newAuthor);
    setName("");
    setGrade("");
    setClassroomId("");
  } catch (err) {
    setError(err instanceof Error ? err.message : "Erro desconhecido");
  } finally {
    setSubmitting(false);
  }
}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Adicionar novo aluno</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="new-author-name" className="text-base font-semibold">Nome</Label>
            <Input
              id="new-author-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo do aluno"
              className="h-12 text-base"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="new-author-grade" className="text-base font-semibold">Série</Label>
            <select
              id="new-author-grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as Grade)}
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="new-author-classroom" className="text-base font-semibold">Turma</Label>
            <select
              id="new-author-classroom"
              value={classroomId}
              onChange={(e) => setClassroomId(e.target.value)}
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button type="button" variant="outline" className="h-11 text-base px-4" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleCreate} disabled={submitting} className="h-11 text-base px-4 font-bold">
            {submitting ? "Criando..." : "Criar aluno"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}