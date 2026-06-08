"use client"
import {  ArrowRight, Clock3 } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";
import Link from "next/link";
import TextCard from "../texts/text-card";
import { getRecentlyUploaded } from "@/lib/texts/select-texts";

type Text = Awaited<ReturnType<typeof getRecentlyUploaded>>[number];

interface Props {
    recentlyUploadedTexts: Text[];
}
export default function UploadedTexts({ recentlyUploadedTexts }: Props) {
  return (
    <section className="py-20 bg-muted/20">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Publicados Recentemente"
            icon={Clock3}
            description="As últimas postagens de textos produzidos por alunos."
          />
          <Button variant="outline" asChild size={"lg"} className="hidden sm:flex">
            <Link href={"/publicar"} className="font-bold bg-secondary hover:bg-primary hover:text-white">
              Ver mais <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
        <div className="grid-wrapper">
          {recentlyUploadedTexts.map((text) =>
            <TextCard key={text.id} text={text} />
          )}
        </div>
      </div>
    </section>
  );
}