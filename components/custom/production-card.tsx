// production-card.tsx
import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"

interface ProductionCardProps {
  id: string
  title: string
  preview: string
  date: string
  onClick: () => void
}

export function ProductionCard({id, title, preview, date, onClick }: ProductionCardProps) {
  return (
    <Card
      onClick={onClick}
      className="flex items-center gap-4 p-4 cursor-pointer hover:bg-muted transition-colors"
    >
      <div className="bg-muted p-3 rounded-md">
        <FileText className="w-6 h-6 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="font-medium truncate">{id}</p>

        <p className="font-medium truncate">{title}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
        <span className="text-xs text-muted-foreground">{date}</span>
      </div>
    </Card>
  )
}

// 

// import React from 'react';
// import { Download, FileText, Calendar } from 'lucide-react';

// interface DocumentCardProps {
//   title: string;
//   fileId: string;
//   fileName: string;
//   fileSize: string;
//   publishedAt: string;
//   authorImage?: string;
//   onDownload?: () => void;
// }

// const DocumentCard: React.FC<DocumentCardProps> = ({
//   title = "Relatório Trimestral de Vendas",
//   fileId = "DCO-2023-Q3",
//   fileName = "relatorio_vendas_q3.pdf",
//   fileSize = "4.2 MB",
//   publishedAt = "12 de Out, 2023",
//   authorImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   onDownload
// }) => {
//   return (
//     <div className="max-w-md bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 font-sans">
//       {/* Header Info */}
//       <div className="flex items-center gap-2 mb-3">
//         <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">
//           PDF
//         </span>
//         <span className="text-slate-500 text-xs font-medium uppercase tracking-tight">
//           {fileId}
//         </span>
//       </div>

//       {/* Title */}
//       <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
//         {title}
//       </h3>
      
//       {/* Description placeholder if needed */}
//       <p className="text-slate-600 text-sm mb-6 leading-relaxed">
//         Análise detalhada do desempenho comercial e métricas de crescimento.
//       </p>

//       {/* File Visualization Area */}
//       <div className="relative aspect-[4/3] bg-slate-50 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center p-4 mb-6 group overflow-hidden">
//         <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 z-10">
//           <FileText className="w-10 h-10 text-blue-600" />
//         </div>
//         <div className="text-center z-10">
//           <p className="text-sm font-semibold text-slate-800 truncate max-w-[240px]">
//             {fileName}
//           </p>
//           <p className="text-xs text-slate-500 mt-1 font-medium">
//             {fileSize}
//           </p>
//         </div>
        
//         {/* Decorative elements to match the "editorial" style of the screenshot */}
//         <div className="absolute bottom-0 right-0 opacity-10 translate-x-4 translate-y-4">
//           <FileText className="w-32 h-32 text-slate-900" />
//         </div>
//       </div>

//       {/* Footer Divider */}
//       <div className="h-px bg-slate-100 w-full mb-4" />

//       {/* Footer Content */}
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-2 text-slate-600">
//           <Calendar className="w-4 h-4" />
//           <span className="text-sm font-medium">
//             Publicado em {publishedAt}
//           </span>
//         </div>
//         {authorImage && (
//           <img 
//             src={authorImage} 
//             alt="Author" 
//             className="w-7 h-7 rounded-full border border-slate-200"
//           />
//         )}
//       </div>

//       {/* Action Button */}
//       <button 
//         onClick={onDownload}
//         className="w-full bg-black hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm active:scale-[0.98]"
//       >
//         <Download className="w-4 h-4" />
//         <span>Baixar Documento</span>
//       </button>
//     </div>
//   );
// };

// export default DocumentCard;