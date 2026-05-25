"use client"
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Button } from "../ui/button";

interface Author {
  name: string
  grade: string
  classroom: string
}

interface SearchItem {
  id: number
  author: Author
  title: string
  theme: string
  status: string
  genre: string
  createdAt: string
  fileExtension?: "pdf" | "doc" | "docx" | "txt" | null
}

interface SearchBarProps {
  searchList: SearchItem[]
  onSearch: (value: string) => void
  onItemSelect: (id: number) => void
}

export function GlobalSearchBar({ searchList, onSearch, onItemSelect }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  // Filtra só para o dropdown — não afeta os cards
  const suggestions = searchList.filter(item =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="flex gap-2 items-center justify-center">
      <Command className="">
        <CommandInput
          className="text-md"
          placeholder="Buscar produção..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        {inputValue && (
          <CommandList>
            <CommandEmpty>Nenhuma produção encontrada</CommandEmpty>
            <CommandGroup>
              {suggestions.map(item => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    // router.push(`/textos/${item.id}`) — descomentar quando tiver a rota
                    onItemSelect(item.id)
                  }}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        )}
      </Command>
      <Button
        onClick={() => onSearch(inputValue)}
        className="h-11 w-22 text-md font-bold"
      >
        Buscar
      </Button>
    </div>
  );
}