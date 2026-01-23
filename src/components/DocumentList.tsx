import { Document } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/helpers'
import { FilePdf, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface DocumentListProps {
  documents: Document[]
  onDelete: (docId: string) => void
  onSelect: (doc: Document) => void
}

export function DocumentList({ documents, onDelete, onSelect }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center gap-3 text-center">
        <FilePdf className="w-12 h-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold mb-1">No documents yet</h3>
          <p className="text-sm text-muted-foreground">
            Import PDF documentation to build your searchable knowledge base
          </p>
        </div>
      </Card>
    )
  }

  const sortedDocs = [...documents].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="flex flex-col gap-3">
      {sortedDocs.map((doc) => (
        <Card
          key={doc.id}
          className="p-4 transition-all duration-200 hover:border-accent/50 hover:shadow-lg"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 mt-1">
              <FilePdf className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 
                className="font-semibold text-lg mb-1 cursor-pointer hover:text-accent transition-colors"
                onClick={() => onSelect(doc)}
              >
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2 font-mono">
                {doc.filename}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {doc.content.slice(0, 200)}...
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatDate(doc.createdAt)}
                </span>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive">
                      <Trash className="w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{doc.title}". This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          onDelete(doc.id)
                          toast.success('Document deleted')
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
