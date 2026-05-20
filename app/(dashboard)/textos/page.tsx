

"use client"

import { GlobalSearchBar } from "@/components/custom/global-search-bar";
import { ProductionCard } from "@/components/custom/production-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const TestInput = [
  { id: "1", title: "Relatório de vendas", preview: "Texto qualuqer coisa", date: "21/12/2002"},
  { id: "2", title: "Apresentação Q1", preview: "Texto qualuqer coisa", date: "21/12/2002" },
  { id: "3", title: "Ata de reunião" , preview: "Texto qualuqer coisa", date: "21/12/2002"},
  { id: "4", title: "Proposta comercial" , preview: "Texto qualuqer coisa", date: "21/12/2002"},
  { id: "5", title: "Planilha de custos", preview: "Texto qualuqer coisa", date: "21/12/2002" },
]



export default function TextsPage(){
    const [search, setSearch] = useState("");
    const filtered = search
  ? TestInput.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))
  : TestInput

    const handleItemClick = (id: string) => {
        console.log(`Navegando para o texto com ID: ${id}`);
        // No futuro, quando tiver a rota de revisão:
        // router.push(`/revisao/${id}`);
    };
    
    const handleSearchSubmit = (value: string) => {
        console.log("Busca global submetida:", value);
        setSearch(value);
    };
    return (

        <div>
            <h1> Produções Escritas</h1>
        
            <GlobalSearchBar 
            searchList={TestInput}
            onSearch={handleSearchSubmit} 
            onItemSelect={handleItemClick}/>
        

            <Button>Publicar</Button>

            <Separator />

             <div className="flex flex-col gap-2 mt-4">
                {filtered.map(item => (
                <ProductionCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    preview={item.preview}
                    date={item.date}
                    onClick={() => handleItemClick(item.id)}
                />
                ))}
            </div>
        </div>

    );
}