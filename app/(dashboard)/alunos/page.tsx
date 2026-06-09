import { Suspense } from "react";
import AuthorCard from "@/components/authors/author-card";
import { Separator } from "@/components/ui/separator";
import { getAllAuthors } from "@/lib/authors/select-authors";
// Importe um skeleton de autor se você tiver, ou use o genérico da Shadcn
import { Skeleton } from "@/components/ui/skeleton";


async function AuthorsListFetcher() {
  const authors = await getAllAuthors();

  const grouped = authors.reduce((acc, author) => {
    const letter = author.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(author);
    return acc;
  }, {} as Record<string, typeof authors>);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="flex flex-col gap-20 w-full max-w-2xl mx-auto">
      {letters.map((letter) => (
        <div key={letter}>
          <p className="font-extrabold text-muted-foreground mb-4 px-1 text-lg">
            {letter}
          </p>
          <div className="flex flex-col gap-4">
            {grouped[letter].map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AlunosPage() {
  return (
    <div className="flex flex-col p-4 sm:p-8 space-y-6 bg-background">

      <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
        <div className="wrapper ">
          <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center ">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Alunos registrados
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-normal">
              Essa área contém todos os alunos registrados em nosso banco de dados.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full ">
            <div className="w-full h-full max-w-2xl"></div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="py-20 px-10 bg-muted/20 items-center">
        <div className="wrapper rounded-lg">
          
          <Suspense
            fallback={
              <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
                <Skeleton className="h-20 w-full rounded-md" />
                <Skeleton className="h-20 w-full rounded-md" />
                <Skeleton className="h-20 w-full rounded-md" />
              </div>
            }
          >
            <AuthorsListFetcher />
          </Suspense>

        </div>
      </section>
    </div>
  );
}