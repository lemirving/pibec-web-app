"use client"

import SectionHeader from "@/components/common/section-header";
import { GlobalSearchBar } from "@/components/custom/global-search-bar";
import { ProductionCard } from "@/components/custom/production-card";
import TextCard from "@/components/texts/text-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PenLine, Plus, Upload } from "lucide-react"; 
import Link from "next/link";
import { useState } from "react";

const TestInput = [
  {
    id: 1,
    author: { name: "Irving Lemuel", grade: "4 ano", classroom: "B" },
    title: "Minha vida na pandemia",
    theme: "Saúde",
    status: "pending",
    genre: "redacao",
    createdAt: "21/05/2026",
    fileExtension: "pdf"
  },
  {
    id: 2,
    author: { name: "Andrey Rogério", grade: "4 ano", classroom: "C" },
    title: "Minha vida na pandemia",
    theme: "Saúde",
    status: "revised",
    genre: "redacao",
    createdAt: "20/05/2026",
    fileExtension: "docx"
  },
  {
    id: 3,
    author: { name: "Lucas Marques", grade: "5 ano", classroom: "A" },
    title: "Meu maior sonho",
    theme: "Social",
    status: "pending",
    genre: "redacao",
    createdAt: "20/05/2026",
    fileExtension: "pdf"
  },
  {
    id: 4,
    author: { name: "Irving Lemuel", grade: "4 ano", classroom: "B" },
    title: "Meu maior sonho",
    theme: "Social",
    status: "pending",
    genre: "redacao",
    createdAt: "20/05/2026",
    fileExtension: "txt"
  },
  {
    id: 9,
    author: { name: "Irving Lemuel", grade: "4 ano", classroom: "B" },
    title: "Meu maior sonho",
    theme: "Social",
    status: "pending",
    genre: "redacao",
    createdAt: "20/05/2026",
    fileExtension: "txt"
  },
  {
    id: 202,
    author: { name: "Irving Lemuel", grade: "4 ano", classroom: "B" },
    title: "Meu maior sonho",
    theme: "Social",
    status: "pending",
    genre: "redacao",
    createdAt: "20/05/2026",
    fileExtension: "txt"
  },
  {
    id: 6,
    author: { name: "Irving Lemuel", grade: "4 ano", classroom: "B" },
    title: "Meu maior sonho",
    theme: "Social",
    status: "pending",
    genre: "redacao",
    createdAt: "20/05/2026",
    fileExtension: "txt"
  }
] 

export default function TextsPage(){
    const [search, setSearch] = useState("");
    
    const filtered = search
      ? TestInput.filter(i => i.title.toLowerCase().includes(search.toLowerCase()))
      : TestInput


    
    const handleSearchSubmit = (value: string) => {
        console.log("Busca global submetida:", value);
        setSearch(value);
    };

    return (
        // Contêiner principal com largura máxima e centralizado
<div className="flex w-full flex-col p-4 sm:p-8 space-y-6 bg-background">           
           {/* Header da Página */}
          <section className="relative overflow-hidden 
            bg-linear-to-b from-background via-background to-muted/20">
                <div className="wrapper ">
                    <div className="flex flex-col items-center
                    justify-center lg:py-24 py-12 text-center ">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"> Produções Escritas</h1>
                        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-normal">
                            Analise as produções do nosso acervo completo.
                        </p>   
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full ">
                    <div className="w-full h-full max-w-2xl">
                     <GlobalSearchBar 
                            searchList={TestInput}
                            onSearch={handleSearchSubmit} 
                        />
                    </div> 
                    {/* <Button className="w-full sm:w-auto gap-2">
                        <Plus className="size-4"/>
                        Nova Coleta
                    </Button> */}
                </div>

                </div>

            </section>

            <Separator />

            <section className="py-20 bg-muted/20 ">
            <div className="wrapper rounded-lg">
                <div className="flex items-center justify-between mb-8">
                
                <SectionHeader 
                    title="Textos publicados" 
                    icon={PenLine} 
                    description=""
                />
                <Button variant="outline" asChild size={"lg"}  className="">
                    <Link href={"/upload"} about={"Upload"}className="font-bold bg-secondary hover:bg-primary hover:text-white">
                        <Upload className="size-5"/>
                        <span className="hidden sm:flex">Upload</span>
                    </Link>
                </Button>
                </div>
                <div className="grid-wrapper">
                    {filtered.map((text) => 
                        <TextCard key={text.id} text={text} />
                    )}
                </div> 
            </div>

        </section>
        </div>
    );
}