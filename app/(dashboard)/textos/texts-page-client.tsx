"use client"

import { PaginationControls } from "@/components/common/pagination";
import SectionHeader from "@/components/common/section-header";
import { GlobalSearchBar } from "@/components/custom/global-search-bar";
import { ProductionCard } from "@/components/custom/production-card";
import TextCard from "@/components/texts/text-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getFeaturedTexts } from "@/lib/texts/select-texts";
import { PenLine, Plus, Upload } from "lucide-react"; 
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Text = Awaited<ReturnType<typeof getFeaturedTexts>>[number]; // tipo inferido do db

interface Props {
  initialTexts: Text[];
}   

export default function TextsPageClient({initialTexts}: Props){
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 4;
    const filtered = search
      ? initialTexts.filter(t => 
          t.content.toLowerCase().includes(search.toLowerCase())
        )
      : initialTexts; 

    
    const searchList = initialTexts.map(t => ({
        id: t.id,
        author: { name: t.authorName ?? "", grade: t.authorGrade ?? "", classroom: "" },
        title: t.title,   // ← direto do banco, sem gambiarra
        theme: t.genre,
        status: t.status,
        genre: t.genre,
        createdAt: t.createdAt.toLocaleDateString("pt-BR"),
    }));
    const totalPages = Math.ceil(filtered.length / perPage)
    const paginated = filtered.slice((page - 1) * perPage, page * perPage)

    const handleOnItemSelect = (id: string) => {
        router.push(`/textos/${id}`)

    }
    
    const handleSearchSubmit = (value: string) => {
        console.log("Busca global submetida:", value);
        setSearch(value);
        setPage(1);    
    };

    return (
        <div className="flex w-full flex-col p-4 sm:p-8 space-y-6 bg-background">           
            {/* 1. CORREÇÃO: Removemos o 'overflow-hidden' desta section */}
           {/* <section className="relative bg-linear-to-b from-background via-background to-muted/20"> */}
                <div className="wrapper">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full relative z-30 mb-24">
                        <div className="w-full h-full max-w-2xl items-center justify-center">
                            <h2 className="text-lg mb-2 font-bold text-center">Busque um texto qualquer.</h2>
                            <GlobalSearchBar 
                                searchList={searchList}
                                onSearch={handleSearchSubmit} 
                                onItemSelect={handleOnItemSelect}
                            />
                        </div> 
                    </div>
                </div>
            {/* </section> */}

            <Separator />

            {/* 3. CORREÇÃO: Garantimos que a seção de baixo tenha um z-index menor (z-10) para o dropdown passar por cima dela tranquilamente */}
            <section className="py-20 bg-muted/20 gap-5 relative z-10">
                <div className="wrapper rounded-lg mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <SectionHeader 
                            title="Textos publicados" 
                            icon={PenLine} 
                            description=""
                        />
                        <Button variant="outline" asChild size={"lg"} className="h-12 w-35 font-bold text-lg">
                            <Link href={"/upload"} className="font-bold text-base bg-secondary hover:bg-primary hover:text-white">
                                <Upload className="size-5"/>
                                <span className="hidden sm:flex">Upload</span>
                            </Link>
                        </Button>
                    </div>
                    <div className="grid-wrapper">
                        {paginated.map((text) => 
                            <TextCard key={text.id} text={text} />
                        )}
                    </div> 
                </div>
                <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage}/>
            </section>
        </div>
    );
}