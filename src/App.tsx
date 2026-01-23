import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { Job, Attachment, Document } from '@/lib/types'
import { performSearch } from '@/lib/helpers'
import { createSampleJobs, createSampleAttachments, createSampleDocuments } from '@/lib/sample-data'
import { JobForm } from '@/components/JobForm'
import { JobList } from '@/components/JobList'
import { JobDetail } from '@/components/JobDetail'
import { DocumentUpload } from '@/components/DocumentUpload'
import { DocumentList } from '@/components/DocumentList'
import { DocumentViewer } from '@/components/DocumentViewer'
import { SearchResults } from '@/components/SearchResults'
import { SampleDataLoader } from '@/components/SampleDataLoader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { Briefcase, FilePdf, MagnifyingGlass, Database } from '@phosphor-icons/react'

type View = 'dashboard' | 'upload' | 'search' | 'documents'

function App() {
  const [jobs = [], setJobs] = useKV<Job[]>('servicelog-jobs', [])
  const [attachments = [], setAttachments] = useKV<Attachment[]>('servicelog-attachments', [])
  const [documents = [], setDocuments] = useKV<Document[]>('servicelog-documents', [])
  
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSearchQuery, setActiveSearchQuery] = useState('')

  const searchResults = useMemo(() => {
    if (!activeSearchQuery.trim()) return []
    return performSearch(jobs, documents, activeSearchQuery)
  }, [jobs, documents, activeSearchQuery])

  const handleCreateJob = (job: Job) => {
    setJobs((currentJobs = []) => [...currentJobs, job])
  }

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs((currentJobs = []) =>
      currentJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    )
    setSelectedJob(updatedJob)
  }

  const handleDeleteJob = (jobId: string) => {
    setJobs((currentJobs = []) => currentJobs.filter((job) => job.id !== jobId))
    setAttachments((currentAttachments = []) =>
      currentAttachments.filter((att) => att.jobId !== jobId)
    )
    setSelectedJob(null)
  }

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job)
    setCurrentView('dashboard')
  }

  const handleAddAttachment = (attachment: Attachment) => {
    setAttachments((currentAttachments = []) => [...currentAttachments, attachment])
  }

  const handleDeleteAttachment = (attachmentId: string) => {
    setAttachments((currentAttachments = []) =>
      currentAttachments.filter((att) => att.id !== attachmentId)
    )
  }

  const handleUploadDocument = (document: Document) => {
    setDocuments((currentDocs = []) => [...currentDocs, document])
  }

  const handleDeleteDocument = (docId: string) => {
    setDocuments((currentDocs = []) => currentDocs.filter((doc) => doc.id !== docId))
    if (selectedDocument?.id === docId) {
      setSelectedDocument(null)
    }
  }

  const handleSearch = () => {
    setActiveSearchQuery(searchQuery)
    setCurrentView('search')
    setSelectedJob(null)
    setSelectedDocument(null)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSelectJobFromSearch = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId)
    if (job) {
      setSelectedJob(job)
      setCurrentView('dashboard')
      setActiveSearchQuery('')
      setSearchQuery('')
    }
  }

  const handleSelectDocumentFromSearch = (docId: string) => {
    const doc = documents.find((d) => d.id === docId)
    if (doc) {
      setSelectedDocument(doc)
      setCurrentView('dashboard')
      setActiveSearchQuery('')
      setSearchQuery('')
    }
  }

  const handleLoadSampleData = () => {
    const sampleJobs = createSampleJobs()
    const sampleAttachments = createSampleAttachments(sampleJobs)
    const sampleDocs = createSampleDocuments()
    
    setJobs((currentJobs = []) => [...currentJobs, ...sampleJobs])
    setAttachments((currentAttachments = []) => [...currentAttachments, ...sampleAttachments])
    setDocuments((currentDocs = []) => [...currentDocs, ...sampleDocs])
    
    setCurrentView('dashboard')
    setSelectedJob(null)
    setSelectedDocument(null)
    
    toast.success('Sample data loaded!', {
      description: '6 jobs with 15+ attachments and 5 technical manuals added.'
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary">
                <Briefcase className="w-6 h-6 text-primary-foreground" weight="fill" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">ServiceLog</h1>
            </div>

            <div className="flex-1 flex items-center gap-2">
              <div className="flex-1 max-w-xl">
                <Input
                  placeholder="Search jobs and documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full"
                />
              </div>
              <Button onClick={handleSearch} className="gap-2">
                <MagnifyingGlass className="w-4 h-4" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleLoadSampleData}
                className="gap-2"
                title="Load sample jobs with attachments"
              >
                <Database className="w-4 h-4" weight="fill" />
                <span className="hidden lg:inline">Samples</span>
              </Button>
              <Button
                variant={currentView === 'upload' ? 'default' : 'outline'}
                onClick={() => {
                  setCurrentView('upload')
                  setSelectedJob(null)
                  setSelectedDocument(null)
                }}
                className="gap-2"
              >
                <FilePdf className="w-4 h-4" />
                <span className="hidden md:inline">Import PDF</span>
              </Button>
              <Button
                variant={currentView === 'dashboard' ? 'default' : 'outline'}
                onClick={() => {
                  setCurrentView('dashboard')
                  setSelectedJob(null)
                  setSelectedDocument(null)
                }}
                className="gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span className="hidden md:inline">Jobs</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-6">
        {currentView === 'dashboard' && (
          <Tabs defaultValue="jobs" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Jobs ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FilePdf className="w-4 h-4" />
                Documents ({documents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jobs">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Create New Job</h2>
                    <JobForm onSubmit={handleCreateJob} />
                  </div>
                  
                  {jobs.length === 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Quick Start</h2>
                      <SampleDataLoader 
                        onLoadData={handleLoadSampleData}
                        hasExistingData={jobs.length > 0}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Recent Jobs</h2>
                    <JobList
                      jobs={jobs}
                      onSelectJob={handleSelectJob}
                      selectedJobId={selectedJob?.id}
                    />
                  </div>

                  {selectedJob && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Job Details</h2>
                      <JobDetail
                        job={selectedJob}
                        attachments={attachments}
                        onUpdate={handleUpdateJob}
                        onDelete={handleDeleteJob}
                        onAddAttachment={handleAddAttachment}
                        onDeleteAttachment={handleDeleteAttachment}
                        onClose={() => setSelectedJob(null)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">PDF Documents</h2>
                    <DocumentList
                      documents={documents}
                      onDelete={handleDeleteDocument}
                      onSelect={(doc) => setSelectedDocument(doc)}
                    />
                  </div>
                  
                  {documents.length === 0 && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">Quick Start</h2>
                      <SampleDataLoader 
                        onLoadData={handleLoadSampleData}
                        hasExistingData={jobs.length > 0}
                      />
                    </div>
                  )}
                </div>

                {selectedDocument && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Document Viewer</h2>
                    <DocumentViewer
                      document={selectedDocument}
                      onClose={() => setSelectedDocument(null)}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {currentView === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <DocumentUpload onUpload={handleUploadDocument} />
          </div>
        )}

        {currentView === 'search' && (
          <div className="max-w-4xl mx-auto">
            <SearchResults
              results={searchResults}
              query={activeSearchQuery}
              onSelectJob={handleSelectJobFromSearch}
              onSelectDocument={handleSelectDocumentFromSearch}
            />
          </div>
        )}
      </main>

      <Toaster position="bottom-right" />
    </div>
  )
}

export default App
