import { Document } from '@/lib/types'
import { useLanguage } from '@/hooks/use-language'
import { generateDocumentPDF } from '@/lib/pdf-export'
import { formatDate } from '@/lib/helpers'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FilePdf, X, Printer } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface DocumentViewerProps {
  document: Document
  onClose: () => void
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const { t } = useLanguage()
  
  const handleExportPDF = () => {
    generateDocumentPDF(document, t)
    toast.success(t.export.exportSuccess)
  }

  return (
    <Card className="p-6 flex flex-col h-full max-h-[80vh]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/10">
            <FilePdf className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold mb-1">{document.title}</h2>
            <p className="text-sm text-muted-foreground font-mono mb-1">
              {document.filename}
            </p>
            <p className="text-xs text-muted-foreground">
              Indexed {formatDate(document.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPDF}
            className="gap-2"
          >
            <Printer className="w-4 h-4" />
            Print PDF
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-4 flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {document.content}
            </pre>
          </div>
        </ScrollArea>
      </div>
    </Card>
  )
}
