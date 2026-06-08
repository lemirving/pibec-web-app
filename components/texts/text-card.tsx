import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { FileThumbnail } from "./file-thumbnail"

type TextStatus = "pendente" | "em_revisao" | "corrigido"
type TextGenre  = "redacao_enem" | "conto" | "cronica" | "artigo_opiniao" | "outro"

const statusLabel: Record<TextStatus, string> = {
  pendente:   "Pendente",
  em_revisao: "Em Revisão",
  corrigido:  "Corrigido"
}

const genreLabel: Record<TextGenre, string> = {
  redacao_enem:   "Redação ENEM",
  conto:          "Conto",
  cronica:        "Crônica",
  artigo_opiniao: "Artigo de Opinião",
  outro:          "Outro"
}

interface Text {
  id:          string
  title:       string
  genre:       TextGenre
  status:      TextStatus
  createdAt:   Date
  authorName:  string | null
  authorGrade: string | null
    fileExtension: string | null  
}

export default function TextCard({ text }: { text: Text }) {
  console.log(`Card "${text.title}" recebeu a extensão:`, text.fileExtension);
  
  return (
    <Link href={`/textos/${text.id}`}>
      <Card className="group flex flex-col justify-between h-full w-full card-hover hover:bg-primary-foreground/10 border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
            {text.title}
          </CardTitle>
          <CardDescription>Postado em: {text.createdAt.toLocaleDateString("pt-BR")}</CardDescription>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge>{statusLabel[text.status]}</Badge>
            <Badge variant="outline">{genreLabel[text.genre]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center flex-1 px-6 py-8 min-h-[140px]">
          <FileThumbnail extension= {text.fileExtension} />
        </CardContent>
        <CardFooter className="pt-2">
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold">Autor: {text.authorName ?? "—"}</span>
            <span className="text-sm text-muted-foreground">Série: {text.authorGrade ?? "—"}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}