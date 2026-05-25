interface Author {
  name:      string
  grade:     string
  classroom: string
}
type TextStatus = "pending" | "revised" | "published"
type TextGenre  = "conto" | "poema" | "artigo" | "redacao" | "outro"
export interface Text {
  id:        number       // string (UUID) quando vier do banco
  author:    Author
  title:     string
  theme:     string
  status:    TextStatus
  genre:     TextGenre
  createdAt: string       // Date quando vier do banco
  fileExtension?: "pdf" | "doc" | "docx" | "txt" | null  // opcional, pode não ter arquivo ainda
}