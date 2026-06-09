import { Suspense } from "react";
import TextsPageClient from "./texts-page-client";
import { getFeaturedTexts } from "@/lib/texts/select-texts";
import { TextCardSkeleton } from "@/components/texts/text-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

async function TextsPageFetcher() {
  const texts = await getFeaturedTexts();
  return <TextsPageClient initialTexts={texts} />;
}

export default function TextsPage() {
  return (
    <div className="flex w-full flex-col p-4 sm:p-8 space-y-6 bg-background">           
      
      {/* 1. CABEÇALHO ESTÁTICO (Fora do Suspense, carrega em 0ms) */}
      <section className="relative bg-linear-to-b from-background via-background to-muted/20">
          <div className="wrapper">
              <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Produções Escritas</h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-normal">
                      Analise as produções do nosso acervo completo.
                  </p>   
              </div>
          </div>
      </section>

      {/* <Separator /> */}

      {/* 2. ÁREA DINÂMICA (Aguardando o Neon) */}
      <Suspense 
        fallback={
          <section className="py-10 bg-muted/20 gap-5 relative z-10">
              <div className="wrapper rounded-lg mb-8">
                  
                  {/* Esqueleto da Busca Global */}
                  <div className="w-full max-w-2xl mx-auto mb-24">
                      <Skeleton className="h-11 w-full rounded-md" /> 
                  </div>

                  {/* Esqueletos do Título Menor e Grid */}
                  <div className="flex items-center justify-between mb-8">
                      <Skeleton className="h-8 w-48" /> 
                      <Skeleton className="h-12 w-32 hidden sm:block" /> 
                  </div>
                  
                  <div className="grid-wrapper">
                      <TextCardSkeleton />
                      <TextCardSkeleton />
                      <TextCardSkeleton />
                      <TextCardSkeleton />
                  </div> 
              </div>
          </section>
        }
      >
        <TextsPageFetcher />
      </Suspense>
    </div>
  );
}