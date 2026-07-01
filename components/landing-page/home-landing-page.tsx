import Link from "next/link";
import { Button } from "../ui/button"
import { LibraryBig, PenSquare, School, Send, Text, User2, UserCircle, Users } from "lucide-react";
import StatsCard from "./stats-card";


const statsData = [
    {
        icon: Text, value: "1.5K+" , label: "Textos submetidos"
    },
    {
        icon: Users, value: "200+" , label: "Alunos registrados"
    },
    {
        icon: School, value: "10+" , label: "Escolas atendidas"
    }
]

export default function HomeLandingPage(){

    return(
        <section className="relative overflow-hidden 
        bg-linear-to-b from-background via-background to-muted/20">
            <div className="wrapper ">
                <div className="flex flex-col items-center
                justify-center lg:py-24 py-12 text-center ">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6"> Organize, revise e acompanhe. Tudo em um só lugar.</h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-normal">
                        O PIBEC é um projeto de iniciação científica que tem como objetivo
                     desenvolver uma plataforma web com um agente de Inteligência Artificial para
                      auxiliar revisores na correção de textos. Além de oferecer suporte durante as revisões, 
                      o sistema também analisa o desempenho dos alunos, buscando identificar dificuldades e propor melhorias para
                       o ambiente escolar no futuro.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <Button asChild size={"lg"} className="text-base font-bold px-9 shadow-lg">
                            
                            <Link href={"/textos"} className="text-white"> <LibraryBig className="size-5"/>Ver Acervo</Link>
                        </Button>
                        <Button asChild size={"lg"} className="text-base font-bold px-9 shadow-lg bg-chart-2">
                            <Link href={"/submeter"} className="text-white">  Submeter <PenSquare className="size-5"/></Link>
                        </Button>
                    </div>
                    <div className="grid  grid-cols-1 sm:grid-cols-3 gap-8 
                                    sm:gap-12 max-w-2xl w-full">
                        {statsData.map((stat) =>
                        (
                            <StatsCard 
                                key={stat.label}
                                {...stat}
                            />

                        )
                    )}
                    </div>
                </div>

            </div>

        </section>
    );
}