import { Job, Document, Attachment, JobStatus } from './types'
import { Translations } from './i18n'

export interface ImportResult {
  jobs: Job[]
  documents: Document[]
  attachments: Attachment[]
}

export interface MergeStats {
  inserted: number
  updated: number
  skipped: number
}

export interface MergeDataResult {
  jobs: Job[]
  documents: Document[]
  attachments: Attachment[]
  stats: {
    jobs: MergeStats
    documents: MergeStats
    attachments: MergeStats
  }
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


function createStableHash(input: string): string {
  let hash = 0

  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }

  return Math.abs(hash).toString(36)
}

function createStableId(prefix: 'job' | 'document' | 'attachment', fields: string[]): string {
  const normalizedSource = fields.map((field) => field.trim().toLowerCase()).join('|')
  return `${prefix}-${createStableHash(normalizedSource)}`
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
    id: data.id || createStableId('job', [
      String(data.title || data[t.jobFields.title] || ''),
      String(data.customer || data[t.jobFields.customer] || ''),
      String(data.machineModel || data[t.jobFields.machineModel] || ''),
      parseDate(data.createdAt || data[t.jobFields.createdAt]),
    ]),
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
    id: data.id || createStableId('document', [
      String(data.title || data[t.jobFields.title] || ''),
      String(data.filename || data[t.documents.document] || 'document.pdf'),
      parseDate(data.createdAt || data[t.jobFields.createdAt]),
    ]),
    title: String(data.title || data[t.jobFields.title] || ''),
    filename: String(data.filename || data[t.documents.document] || 'document.pdf'),
    content: String(data.content || ''),
    createdAt: parseDate(data.createdAt || data[t.jobFields.createdAt])
  }
}

function normalizeAttachment(data: LegacyAttachmentData): Attachment {
  const normalizedJobId = data.jobId || ''

  return {
    id: data.id || createStableId('attachment', [
      normalizedJobId,
      String(data.filename || ''),
      parseDate(data.createdAt),
      String((data.data || '')).slice(0, 64),
    ]),
    jobId: normalizedJobId,
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

function toTimestamp(dateValue: string): number {
  const timestamp = new Date(dateValue).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function mergeImportedData(
  existing: { jobs: Job[]; documents: Document[]; attachments: Attachment[] },
  incoming: ImportResult
): MergeDataResult {
  const mergedJobs = new Map<string, Job>()
  const mergedDocuments = new Map<string, Document>()
  const mergedAttachments = new Map<string, Attachment>()

  const stats: MergeDataResult['stats'] = {
    jobs: { inserted: 0, updated: 0, skipped: 0 },
    documents: { inserted: 0, updated: 0, skipped: 0 },
    attachments: { inserted: 0, updated: 0, skipped: 0 },
  }

  existing.jobs.forEach((job) => mergedJobs.set(job.id, job))
  existing.documents.forEach((document) => mergedDocuments.set(document.id, document))
  existing.attachments.forEach((attachment) => mergedAttachments.set(attachment.id, attachment))

  incoming.jobs.forEach((job) => {
    const existingJob = mergedJobs.get(job.id)

    if (!existingJob) {
      mergedJobs.set(job.id, job)
      stats.jobs.inserted += 1
      return
    }

    if (toTimestamp(job.updatedAt) > toTimestamp(existingJob.updatedAt)) {
      mergedJobs.set(job.id, job)
      stats.jobs.updated += 1
    } else {
      stats.jobs.skipped += 1
    }
  })

  incoming.documents.forEach((document) => {
    const existingDocument = mergedDocuments.get(document.id)

    if (!existingDocument) {
      mergedDocuments.set(document.id, document)
      stats.documents.inserted += 1
      return
    }

    if (toTimestamp(document.createdAt) >= toTimestamp(existingDocument.createdAt)) {
      mergedDocuments.set(document.id, document)
      stats.documents.updated += 1
    } else {
      stats.documents.skipped += 1
    }
  })

  const finalJobIds = new Set(mergedJobs.keys())

  incoming.attachments.forEach((attachment) => {
    if (!attachment.jobId || !finalJobIds.has(attachment.jobId)) {
      stats.attachments.skipped += 1
      return
    }

    const existingAttachment = mergedAttachments.get(attachment.id)

    if (!existingAttachment) {
      mergedAttachments.set(attachment.id, attachment)
      stats.attachments.inserted += 1
      return
    }

    if (toTimestamp(attachment.createdAt) > toTimestamp(existingAttachment.createdAt)) {
      mergedAttachments.set(attachment.id, attachment)
      stats.attachments.updated += 1
    } else {
      stats.attachments.skipped += 1
    }
  })

  return {
    jobs: Array.from(mergedJobs.values()),
    documents: Array.from(mergedDocuments.values()),
    attachments: Array.from(mergedAttachments.values()),
    stats,
  }
}
