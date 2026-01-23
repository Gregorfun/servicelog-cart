export type JobStatus = 'open' | 'in-progress' | 'completed' | 'cancelled'

export interface Job {
  id: string
  createdAt: string
  updatedAt: string
  title: string
  customer: string
  location: string
  machineModel: string
  serialNo: string
  errorCode: string
  symptoms: string
  fix: string
  status: JobStatus
}

export interface Attachment {
  id: string
  jobId: string
  filename: string
  mimeType: string
  data: string
  createdAt: string
}

export interface Document {
  id: string
  title: string
  filename: string
  content: string
  createdAt: string
}

export interface SearchResult {
  kind: 'job' | 'document'
  id: string
  title: string
  snippet: string
}
