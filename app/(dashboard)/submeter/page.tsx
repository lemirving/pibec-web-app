import SectionHeader from "@/components/common/section-header";
import { SubmitForm } from "@/components/submit/submit-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { Separator } from "radix-ui";
import { getAllClassrooms } from "@/lib/classrooms/get-classrooms";
import ClassroomLoader from "@/components/classrooms/classroom-loader";
import { Suspense } from "react";





export default function Submit() {

    return (
        <div className="px-20">
            <section className="relative bg-linear-to-b from-background via-background to-muted/20">
                 <div className="wrapper">
                    <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Submissão de Textos</h1>
                        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl leading-normal">
                            Submeta novas produções escritas nesta área.
                        </p>   
                    </div>
                </div>
            </section>
             
            <section className="w-full flex justify-center px-4 py-8">
                    <Suspense>
                   <ClassroomLoader />   
                </Suspense>
            </section>
        </div>
    );
}