"use client"
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { InferSelectModel } from "drizzle-orm";
import { authors } from "@/db/schema";


export type dbAuthor = InferSelectModel<typeof authors>;

export type Author = Pick<dbAuthor, 'id' | 'name' | 'grade'>

interface AuthorSearchProps {
  authorsList: Author[];
  onAuthorSelect: (author: Author | null) => void;
}

export function AuthorsSearchBar({ authorsList, onAuthorSelect }: AuthorSearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredStudents = authorsList.filter(author =>
    author.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <Command className="border rounded-md border-input">
        <CommandInput
          placeholder="Digite o nome do aluno..."
          value={inputValue}
          onValueChange={(value) => {
            setInputValue(value);
            setIsOpen(true);
            if (value === "") onAuthorSelect(null); // Limpa a seleção se o input esvaziar
          }}
          onFocus={() => setIsOpen(true)}
        />
        {isOpen && inputValue && (
          <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover text-popover-foreground border rounded-md shadow-md max-h-[200px] overflow-y-auto">
            <CommandEmpty>Nenhum aluno encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredStudents.map((student) => (
                <CommandItem
                  key={student.id}
                  value={student.name}
                  onSelect={() => {
                    setInputValue(student.name);
                    onAuthorSelect(student); 
                    setIsOpen(false); 
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{student.name}</span>
                    <span className="text-xs text-muted-foreground">{student.grade}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
    </div>
  );
}