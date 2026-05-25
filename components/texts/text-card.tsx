import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { FileThumbnail } from "./file-thumbnail"

interface Author {
  name:      string
  grade:     string
  classroom: string
}
type TextStatus = "pending" | "revised" | "published"
type TextGenre  = "conto" | "poema" | "artigo" | "redacao" | "outro"
const statusLabel: Record<TextStatus, string> = {
  pending:   "Pendente",
  revised:   "Revisado",
  published: "Publicado"
}

const genreLabel: Record<TextGenre, string> = {
  redacao: "Redação",
  conto:   "Conto",
  poema:   "Poema",
  artigo:  "Artigo",
  outro:   "Outro"
}
interface Text {
  id:        number       // string (UUID) quando vier do banco
  author:    Author
  title:     string
  theme:     string
  status:    TextStatus
  genre:     TextGenre
  createdAt: string       // Date quando vier do banco
  fileExtension?: "pdf" | "doc" | "docx" | "txt" | null  // opcional, pode não ter arquivo ainda
}
export default function TextCard({ text }: { text: Text }) {
  return (
    <Link href={`/textos/${text.id}`}>
      <Card className="group flex flex-col justify-between h-full w-full card-hover hover:bg-primary-foreground/10 border border-gray-200">
        
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
            {text.title}
          </CardTitle>
          <CardDescription>Postado em: {text.createdAt}</CardDescription>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge variant="outline">{text.theme}</Badge>
            {/* CORREÇÃO 1: Usar statusLabel com text.status */}
            <Badge variant="outline">{statusLabel[text.status]}</Badge>
            
            {/* CORREÇÃO 2: Usar genreLabel com text.genre */}
            <Badge variant="outline">{genreLabel[text.genre]}</Badge>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center flex-1 px-6 py-8 min-h-[140px]">
          <FileThumbnail extension={text.fileExtension} />
        </CardContent>

        <CardFooter className="pt-2">
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold">Autor: {text.author.name}</span>
            <span className="text-sm text-muted-foreground">
              Série/Turma: {text.author.grade} - {text.author.classroom}
            </span>
          </div>
        </CardFooter>

      </Card>
    </Link>
  )
}