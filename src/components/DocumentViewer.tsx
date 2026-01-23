import { Document } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/helpers'
import { X, FilePdf } from '@phosphor-icons/react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface DocumentViewerProps {
  document: Document
  onClose: () => void
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
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
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
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
