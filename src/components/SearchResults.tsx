import { SearchResult } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Briefcase, FilePdf, MagnifyingGlass } from '@phosphor-icons/react'

interface SearchResultsProps {
  results: SearchResult[]
  query: string
  onSelectJob: (jobId: string) => void
  onSelectDocument: (docId: string) => void
}

export function SearchResults({ results, query, onSelectJob, onSelectDocument }: SearchResultsProps) {
  if (!query) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center gap-3 text-center">
        <MagnifyingGlass className="w-12 h-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold mb-1">Global Search</h3>
          <p className="text-sm text-muted-foreground">
            Search across all jobs and documents
          </p>
        </div>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center gap-3 text-center">
        <MagnifyingGlass className="w-12 h-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold mb-1">No results found</h3>
          <p className="text-sm text-muted-foreground">
            Try different keywords or check your spelling
          </p>
        </div>
      </Card>
    )
  }

  const jobResults = results.filter(r => r.kind === 'job')
  const docResults = results.filter(r => r.kind === 'document')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </h3>
      </div>

      {docResults.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <FilePdf className="w-4 h-4" />
            Documents ({docResults.length})
          </h4>
          {docResults.map((result) => (
            <Card
              key={`doc-${result.id}`}
              className="p-4 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:shadow-lg"
              onClick={() => onSelectDocument(result.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 mt-1">
                  <FilePdf className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{result.title}</h3>
                    <Badge variant="secondary" className="text-xs">Document</Badge>
                  </div>
                  <p
                    className="text-sm text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: result.snippet }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {jobResults.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Jobs ({jobResults.length})
          </h4>
          {jobResults.map((result) => (
            <Card
              key={`job-${result.id}`}
              className="p-4 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:shadow-lg"
              onClick={() => onSelectJob(result.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-secondary/50 mt-1">
                  <Briefcase className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{result.title}</h3>
                    <Badge variant="outline" className="text-xs">Job</Badge>
                  </div>
                  <p
                    className="text-sm text-muted-foreground line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: result.snippet }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
