import { useState, useMemo } from 'react'
import { Job, Document, SearchResult } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MagnifyingGlass, 
  Funnel, 
  X, 
  Briefcase, 
  FilePdf,
  Wrench,
  Barcode
} from '@phosphor-icons/react'
import { searchByErrorCode, searchByMachineModel, extractErrorCodes, extractMachineModels } from '@/lib/advanced-search'

interface AdvancedSearchProps {
  jobs: Job[]
  documents: Document[]
  onSelectJob: (jobId: string) => void
  onSelectDocument: (docId: string) => void
  onClose: () => void
}

export function AdvancedSearch({ 
  jobs, 
  documents, 
  onSelectJob, 
  onSelectDocument,
  onClose 
}: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'all' | 'error-code' | 'machine-model'>('all')
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const allErrorCodes = useMemo(() => extractErrorCodes(jobs), [jobs])
  const allMachineModels = useMemo(() => extractMachineModels(jobs), [jobs])

  const searchResults = useMemo(() => {
    const query = activeFilter || searchQuery
    if (!query.trim()) return []

    if (searchType === 'error-code' || (searchType === 'all' && activeFilter && allErrorCodes.includes(activeFilter))) {
      return searchByErrorCode(jobs, documents, query)
    } else if (searchType === 'machine-model' || (searchType === 'all' && activeFilter && allMachineModels.includes(activeFilter))) {
      return searchByMachineModel(jobs, documents, query)
    }

    return []
  }, [searchQuery, searchType, activeFilter, jobs, documents, allErrorCodes, allMachineModels])

  const handleQuickFilter = (value: string) => {
    if (activeFilter === value) {
      setActiveFilter(null)
    } else {
      setActiveFilter(value)
    }
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.kind === 'job') {
      onSelectJob(result.id)
    } else {
      onSelectDocument(result.id)
    }
    onClose()
  }

  const clearSearch = () => {
    setSearchQuery('')
    setActiveFilter(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Advanced Search</h2>
          <p className="text-muted-foreground">Search by error codes or machine models</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <Tabs value={searchType} onValueChange={(v) => setSearchType(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="error-code" className="gap-2">
            <Wrench className="w-4 h-4" />
            Error Codes
          </TabsTrigger>
          <TabsTrigger value="machine-model" className="gap-2">
            <Barcode className="w-4 h-4" />
            Machine Models
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search error codes or machine models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {(searchQuery || activeFilter) && (
              <Button variant="outline" onClick={clearSearch}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold">Quick Filter: Error Codes</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allErrorCodes.length > 0 ? (
                  allErrorCodes.slice(0, 12).map((code) => (
                    <Badge
                      key={code}
                      variant={activeFilter === code ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-accent transition-colors font-mono"
                      onClick={() => handleQuickFilter(code)}
                    >
                      {code}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No error codes found</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Barcode className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold">Quick Filter: Machine Models</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {allMachineModels.length > 0 ? (
                  allMachineModels.slice(0, 12).map((model) => (
                    <Badge
                      key={model}
                      variant={activeFilter === model ? 'default' : 'outline'}
                      className="cursor-pointer hover:bg-accent transition-colors font-mono"
                      onClick={() => handleQuickFilter(model)}
                    >
                      {model}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No machine models found</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="error-code" className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter error code (e.g., E100, ERR-2001)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-mono"
              />
            </div>
            {(searchQuery || activeFilter) && (
              <Button variant="outline" onClick={clearSearch}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Funnel className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">Available Error Codes</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allErrorCodes.length > 0 ? (
                allErrorCodes.map((code) => (
                  <Badge
                    key={code}
                    variant={activeFilter === code ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors font-mono"
                    onClick={() => handleQuickFilter(code)}
                  >
                    {code}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No error codes recorded yet</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="machine-model" className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter machine model (e.g., XC-3000, Titan Pro)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 font-mono"
              />
            </div>
            {(searchQuery || activeFilter) && (
              <Button variant="outline" onClick={clearSearch}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Funnel className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold">Available Machine Models</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allMachineModels.length > 0 ? (
                allMachineModels.map((model) => (
                  <Badge
                    key={model}
                    variant={activeFilter === model ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-accent transition-colors font-mono"
                    onClick={() => handleQuickFilter(model)}
                  >
                    {model}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No machine models recorded yet</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {(searchQuery || activeFilter) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Results ({searchResults.length})
            </h3>
            {activeFilter && (
              <Badge variant="secondary" className="font-mono">
                Filtering by: {activeFilter}
              </Badge>
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((result) => (
                <Card
                  key={`${result.kind}-${result.id}`}
                  className="p-4 cursor-pointer hover:bg-card/80 transition-colors"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded bg-primary/10 text-primary mt-1">
                      {result.kind === 'job' ? (
                        <Briefcase className="w-4 h-4" />
                      ) : (
                        <FilePdf className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {result.kind === 'job' ? 'Job' : 'Document'}
                        </Badge>
                        <h4 className="font-semibold truncate">{result.title}</h4>
                      </div>
                      <p
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: result.snippet }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <MagnifyingGlass className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No results found for "{activeFilter || searchQuery}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Try a different {searchType === 'error-code' ? 'error code' : 'machine model'}
              </p>
            </Card>
          )}
        </div>
      )}

      {!searchQuery && !activeFilter && (
        <Card className="p-8 text-center border-dashed">
          <Funnel className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Enter a search term or click a quick filter badge above
          </p>
        </Card>
      )}
    </div>
  )
}
