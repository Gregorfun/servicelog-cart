import { Job, Document, Attachment, JobStatus } from './types'
import { Translations } from './i18n'

export interface ImportResult {
  jobs: Job[]
  documents: Document[]
  attachments: Attachment[]
}

interface LegacyJobData {
  id?: string
  title?: string
  customer?: string
  location?: string
  machineModel?: string
  serialNo?: string
  errorCode?: string
  symptoms?: string
  fix?: string
  status?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

interface LegacyDocumentData {
  id?: string
  title?: string
  filename?: string
  content?: string
  createdAt?: string
  [key: string]: unknown
}

interface LegacyAttachmentData {
  id?: string
  jobId?: string
  filename?: string
  mimeType?: string
  data?: string
  createdAt?: string
  [key: string]: unknown
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function parseDate(dateValue: unknown): string {
  if (!dateValue) return new Date().toISOString()
  
  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue)
    return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
  }
  
  return new Date().toISOString()
}

function normalizeJob(data: LegacyJobData, t: Translations): Job {
  const now = new Date().toISOString()
  
  let rawStatus = String(data.status || data[t.jobFields.status] || 'open')
  let normalizedStatus: JobStatus = 'open'
  
  const statusLower = rawStatus.toLowerCase()
  if (statusLower.includes('progress') || statusLower === t.status.progress.toLowerCase()) {
    normalizedStatus = 'in-progress'
  } else if (statusLower.includes('complete') || statusLower === t.status.completed.toLowerCase()) {
    normalizedStatus = 'completed'
  } else if (statusLower.includes('cancel') || statusLower === t.status.cancelled.toLowerCase()) {
    normalizedStatus = 'cancelled'
  } else if (statusLower.includes('open') || statusLower === t.status.open.toLowerCase()) {
    normalizedStatus = 'open'
  }
  
  const jobData: Job = {
    id: data.id || generateId(),
    title: String(data.title || data[t.jobFields.title] || ''),
    customer: String(data.customer || data[t.jobFields.customer] || ''),
    location: String(data.location || data[t.jobFields.location] || ''),
    machineModel: String(data.machineModel || data[t.jobFields.machineModel] || ''),
    serialNo: String(data.serialNo || data[t.jobFields.serialNo] || ''),
    errorCode: String(data.errorCode || data[t.jobFields.errorCode] || ''),
    symptoms: String(data.symptoms || data[t.jobFields.symptoms] || ''),
    fix: String(data.fix || data[t.jobFields.fix] || ''),
    status: normalizedStatus,
    createdAt: parseDate(data.createdAt || data[t.jobFields.createdAt]),
    updatedAt: parseDate(data.updatedAt || data[t.jobFields.updatedAt])
  }

  return jobData
}

function normalizeDocument(data: LegacyDocumentData, t: Translations): Document {
  return {
    id: data.id || generateId(),
    title: String(data.title || data[t.jobFields.title] || ''),
    filename: String(data.filename || data[t.documents.document] || 'document.pdf'),
    content: String(data.content || ''),
    createdAt: parseDate(data.createdAt || data[t.jobFields.createdAt])
  }
}

function normalizeAttachment(data: LegacyAttachmentData): Attachment {
  return {
    id: data.id || generateId(),
    jobId: data.jobId || '',
    filename: String(data.filename || ''),
    mimeType: String(data.mimeType || 'application/octet-stream'),
    data: String(data.data || ''),
    createdAt: parseDate(data.createdAt)
  }
}

export function importDataFromJSON(jsonString: string, t: Translations): ImportResult {
  try {
    const parsed = JSON.parse(jsonString)
    
    const result: ImportResult = {
      jobs: [],
      documents: [],
      attachments: []
    }

    if (Array.isArray(parsed)) {
      result.jobs = parsed
        .filter((item: unknown) => item && typeof item === 'object')
        .map((item: LegacyJobData) => normalizeJob(item, t))
    } else if (typeof parsed === 'object' && parsed !== null) {
      if (parsed.jobs && Array.isArray(parsed.jobs)) {
        result.jobs = parsed.jobs
          .filter((item: unknown) => item && typeof item === 'object')
          .map((item: LegacyJobData) => normalizeJob(item, t))
      }
      
      if (parsed.documents && Array.isArray(parsed.documents)) {
        result.documents = parsed.documents
          .filter((item: unknown) => item && typeof item === 'object')
          .map((item: LegacyDocumentData) => normalizeDocument(item, t))
      }
      
      if (parsed.attachments && Array.isArray(parsed.attachments)) {
        result.attachments = parsed.attachments
          .filter((item: unknown) => item && typeof item === 'object')
          .map((item: LegacyAttachmentData) => normalizeAttachment(item))
      }
    }

    return result
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`)
  }
}
