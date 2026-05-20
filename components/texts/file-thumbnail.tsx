

const extensionConfig = {
  pdf:  { bg: "bg-red-50",   border: "border-red-200",  text: "text-red-600",   label: "PDF"  },
  doc:  { bg: "bg-blue-50",  border: "border-blue-200", text: "text-blue-600",  label: "DOC"  },
  docx: { bg: "bg-blue-50",  border: "border-blue-200", text: "text-blue-600",  label: "DOCX" },
  txt:  { bg: "bg-gray-50",  border: "border-gray-200", text: "text-gray-500",  label: "TXT"  },
}

export function FileThumbnail({ extension }: { extension?: string | null }) {
  const config = extensionConfig[extension as keyof typeof extensionConfig] ?? {
    bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-400", label: "ARQ"
  }

  return (
    <div className={`w-full h-40 rounded-md border ${config.bg} ${config.border} flex flex-col items-center justify-center gap-2`}>
      {/* ícone de documento */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.5" className={config.text}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="8" y1="13" x2="16" y2="13"/>
        <line x1="8" y1="17" x2="16" y2="17"/>
      </svg>
      <span className={`text-xs font-semibold tracking-wider ${config.text}`}>
        {config.label}
      </span>
    </div>
  )
}