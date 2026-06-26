"use client"
import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Author {
  name: string
  grade: string
  classroom: string
}

interface SearchItem {
  id: string
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
  onItemSelect: (id: string) => void
}

export function GlobalSearchBar({ searchList, onSearch, onItemSelect }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const suggestions = searchList.filter(item =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="relative flex gap-2 items-center justify-center w-full">
      <Command className="overflow-visible"> 
        <CommandInput
          className="text-md"
          placeholder="Buscar produção..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        {inputValue && (
          <CommandList className="absolute top-full left-0 right-0 mt-1 z-50 bg-popover text-popover-foreground border rounded-md shadow-md max-h-[300px] overflow-y-auto">
            <CommandEmpty>Nenhuma produção encontrada</CommandEmpty>
            <CommandGroup>
              {suggestions.map(item => (
                <CommandItem
                  key={item.id}
                  value={`${item.id}-${item.title}`}
                  onSelect={() => {
                    router.push(`/textos/${item.id}`)
                  }}
                  className="cursor-pointer"
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