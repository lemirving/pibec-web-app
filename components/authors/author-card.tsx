import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";


interface TextAuthor {
  name:      string
  grade:     string
  classroom: string
}

export default function AuthorCard({ author }: { author: TextAuthor }) {
  const initials = author.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <Card className="w-full flex flex-row items-center justify-between p-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-chart-4 flex items-center justify-center text-foreground font-medium text-sm shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-medium text-base">{author.name}</p>
          <p className="text-sm text-muted-foreground">{author.grade} — Turma {author.classroom}</p>
        </div>
      </div>
      <Button variant="outline" size="sm" className="gap-2">
        <Eye size={16} />
        Visualizar
      </Button>
    </Card>
  )
}