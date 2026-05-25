import {  ArrowRight, Clock3 } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import TextCard from "../texts/text-card";

const recentlyUploaded = [
        {
        id: 1,
        author: { name:"Irving Lemuel", grade: "4 ano", classroom: "B"},
        title: "Minha vida na pandemia",
        theme: "Saúde",
        status: "Pendente",
        genre: "Redação",
        createdAt: "21/05/2026",
        fileExtension: "pdf"
        },
        {
        id: 2,
        author: { name:"Andrey Rogério", grade: "4 ano", classroom: "C"},
        title: "Minha vida na pandemia",
        theme: "Saúde",
        status: "Revisado",
        genre: "Redação",
        createdAt: "20/05/2026",
        fileExtension: "docx"
        },
        {
        id: 3,
        author: { name:"Lucas Marques", grade: "5 ano", classroom: "A"},
        title: "Meu maior sonho",
        theme: "Social",
        status: "Pendente",
        genre: "Redação",
        createdAt: "20/05/2026",
        fileExtension: "pdf"
        },
        {
        id: 4,
        author: { name:"Irving Lemuel", grade: "4 ano", classroom: "B"},
        title: "Meu maior sonho",
        theme: "Social",
        status: "Pendente",
        genre: "Redação",
        createdAt: "20/05/2026",
        fileExtension: "txt"
        },
        {
        id: 9,
        author: { name:"Irving Lemuel", grade: "4 ano", classroom: "B"},
        title: "Meu maior sonho",
        theme: "Social",
        status: "Pendente",
        genre: "Redação",
        createdAt: "20/05/2026",
        fileExtension: "txt"
        },
        {
        id: 202,
        author: { name:"Irving Lemuel", grade: "4 ano", classroom: "B"},
        title: "Meu maior sonho",
        theme: "Social",
        status: "Pendente",
        genre: "Redação",
        createdAt: "20/05/2026",
        fileExtension: "txt"
        },
        {
        id: 6,
        author: { name:"Irving Lemuel", grade: "4 ano", classroom: "B"},
        title: "Meu maior sonho",
        theme: "Social",
        status: "Pendente",
        genre: "Redação",
        createdAt: "20/05/2026",
        fileExtension: "txt"
        }
        
        
]

export default function UploadedTexts(){

    return(

        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center justify-between mb-8">
                
                <SectionHeader 
                    title="Publicados Recentemente" 
                    icon={Clock3} 
                    description="As últimas postagens de textis produzidos por alunos."
                />
                <Button variant="outline" asChild size={"lg"}  className="hidden sm:flex">
                    <Link href={"/publicar"} className="font-bold bg-secondary hover:bg-primary hover:text-white">  Ver mais <ArrowRight className="size-5"/></Link>
                </Button>
                </div>
                <div className="grid-wrapper">
                    {recentlyUploaded.map((text) => 
                        <TextCard key={text.id} text={text} />
                    )}
                </div> 
            </div>

        </section>
        

    );
}