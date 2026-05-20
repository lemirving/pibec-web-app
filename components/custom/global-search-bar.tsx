
"use client"

import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Button } from "../ui/button";

interface searchTestType {
  title: string
  id: string
  preview: string
  date: string
}

interface SearchBarProps {
    searchList: searchTestType[]
    onSearch: (value: string) => void
    onItemSelect: (id: string) => void
}


export function GlobalSearchBar({searchList, onSearch, onItemSelect}: SearchBarProps) {
    const [inputValue, setInputValue] = useState('');
    const filtered = searchList.filter(item =>
    item.title.toLowerCase().includes(inputValue.toLowerCase())
    )

    return (
         <div className="flex gap-2 items-start">
            <Command inputMode="text" className="">
                <CommandInput className = "h-full" placeholder="Buscar produção..." value={inputValue} onValueChange={(e) => setInputValue(e)}/>
                {inputValue && (
                <CommandList>
                    <CommandEmpty>Nenhuma produção encontrada</CommandEmpty>
                    <CommandGroup>
                    {filtered.map(item => (
                        <CommandItem
                        key={item.id}
                        onSelect={() => onItemSelect(item.id)} // troca por navegação depois
                        >
                        {item.title}
                        </CommandItem>
                    ))}
                    </CommandGroup>
                    </CommandList>
                )}
            </Command>
            <Button onClick={() => onSearch(inputValue)}>Buscar</Button>
      </div>
    );
}