import AuthorCard from "@/components/authors/author-card";
import SectionHeader from "@/components/common/section-header";
import { GlobalSearchBar } from "@/components/custom/global-search-bar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const list = [
  { id: 1, name: "Irving Lemuel",   grade: "4 ano", classroom: "B" },
  { id: 2, name: "Andrey Rogério",  grade: "4 ano", classroom: "C" },
  { id: 3, name: "Lucas Marques",   grade: "5 ano", classroom: "A" },
  { id: 4, name: "Bruna Souza",     grade: "3 ano", classroom: "A" },
  { id: 5, name: "Beatriz Lima",    grade: "5 ano", classroom: "B" },
  { id: 6, name: "Rafael Mendes",   grade: "3 ano", classroom: "C" },
  { id: 7, name: "Luciana Costa",   grade: "4 ano", classroom: "A" },
] 

const grouped = list.reduce((acc, author) => {
  const letter = author.name[0].toUpperCase()
  if (!acc[letter]) acc[letter] = []
  acc[letter].push(author)
  return acc
}, {} as Record<string, typeof list>)

const letters = Object.keys(grouped).sort()

export default function AlunosPage( ){
    return (<div className="flex flex-col p-4 sm:p-8 space-y-6 bg-background">           
               {/* Header da Página */}
              <section className="relative overflow-hidden 
                bg-linear-to-b from-background via-background to-muted/20">
                    <div className="wrapper ">
                        <div className="flex flex-col items-center
                        justify-center lg:py-24 py-12 text-center ">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"> Alunos registrados</h1>
                            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-normal">
                            Essa área contém todos os alunos registrados em nosso banco de dados.
                            </p>  
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full ">
                        <div className="w-full h-full max-w-2xl">

                        </div> 
                        {/* <Button className="w-full sm:w-auto gap-2">
                            <Plus className="size-4"/>
                            Nova Coleta
                        </Button> */}
                    </div>
    
                    </div>
    
                </section>
    
                <Separator />
    
                <section className="py-20 px-10 bg-muted/20 items-center">
                <div className="wrapper rounded-lg">
                    {/* <div className="flex items-center justify-between mb-8">
                    
                    <SectionHeader 
                        title="Textos publicados" 
                        icon={PenLine} 
                        description=""
                    />

                    </div> */}
                    <div className="flex flex-col gap-20 w-full max-w-2xl mx-auto">
                        {letters.map(letter => (
                            <div key={letter}>
                            <p className=" font-extrabold text-muted-foreground mb-4 px-1 text-lg ">{letter}</p>
                            <div className="flex flex-col gap-4">
                                {grouped[letter].map(author => (
                                <AuthorCard key={author.id} author={author} />
                                ))}
                            </div>
                            </div>
                        ))}
                        </div>
                </div>
    
                </section>
            </div>)
}