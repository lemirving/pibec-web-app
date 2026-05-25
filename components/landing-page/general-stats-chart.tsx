import { ChartArea, Wrench } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Card } from "../ui/card";

export default function GeneralStatsChart(){
 
    return(
    <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <SectionHeader
                    title="Análises Gráficas"
                    icon={ChartArea}
                    description="Veja as análises mais recentes gráficas do desempenho dos alunos."
                />
               <Card className="h-150 items-center justify-center">
                <div className="flex flex-col gap-5 items-center justify-center text-xl bg-primary-foreground/5 min-h-48 p-8 rounded-xl">
                    <Wrench className="size-15" />
                    <p>Essa ferramenta está em desenvolvimento.</p>
                </div>
                </Card>
            </div>
        </section>
    );
}