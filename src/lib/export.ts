import { Job, Document, Attachment } from './types'
import { Translations } from './i18n'

export type ExportFormat = 'json' | 'csv'

interface ExportOptions {
  format: ExportFormat
  includeAttachments?: boolean
}

function formatDate(dateString: string, t: Translations): string {
  const date = new Date(dateString)
  return date.toLocaleString()
}

function getStatusLabel(status: string, t: Translations): string {
  switch (status) {
    case 'open':
      return t.status.open
    case 'in-progress':
      return t.status.progress
    case 'completed':
      return t.status.completed
    case 'cancelled':
      return t.status.cancelled
    default:
      return status
  }
}

function escapeCSV(value: string): string {
  if (!value) return ''
  const stringValue = String(value)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportJobsAsJSON(jobs: Job[], attachments: Attachment[], t: Translations): void {
  if (jobs.length === 0) {
    throw new Error(t.export.noDataToExport)
  }

  const exportData = jobs.map(job => {
    const jobAttachments = attachments.filter(att => att.jobId === job.id)
    
    return {
      [t.jobFields.title]: job.title,
      [t.jobFields.customer]: job.customer,
      [t.jobFields.location]: job.location,
      [t.jobFields.machineModel]: job.machineModel,
      [t.jobFields.serialNo]: job.serialNo,
      [t.jobFields.errorCode]: job.errorCode,
      [t.jobFields.symptoms]: job.symptoms,
      [t.jobFields.fix]: job.fix,
      [t.jobFields.status]: getStatusLabel(job.status, t),
      [t.jobFields.createdAt]: formatDate(job.createdAt, t),
      [t.jobFields.updatedAt]: formatDate(job.updatedAt, t),
      [t.attachments.attachments]: jobAttachments.map(att => att.filename)
    }
  })

  const content = JSON.stringify(exportData, null, 2)
  const timestamp = new Date().toISOString().split('T')[0]
  downloadFile(content, `servicelog-jobs-${timestamp}.json`, 'application/json')
}

export function exportJobsAsCSV(jobs: Job[], attachments: Attachment[], t: Translations): void {
  if (jobs.length === 0) {
    throw new Error(t.export.noDataToExport)
  }

  const headers = [
    t.jobFields.title,
    t.jobFields.customer,
    t.jobFields.location,
    t.jobFields.machineModel,
    t.jobFields.serialNo,
    t.jobFields.errorCode,
    t.jobFields.symptoms,
    t.jobFields.fix,
    t.jobFields.status,
    t.jobFields.createdAt,
    t.jobFields.updatedAt,
    t.attachments.attachments
  ]

  const rows = jobs.map(job => {
    const jobAttachments = attachments.filter(att => att.jobId === job.id)
    
    return [
      escapeCSV(job.title),
      escapeCSV(job.customer),
      escapeCSV(job.location),
      escapeCSV(job.machineModel),
      escapeCSV(job.serialNo),
      escapeCSV(job.errorCode),
      escapeCSV(job.symptoms),
      escapeCSV(job.fix),
      escapeCSV(getStatusLabel(job.status, t)),
      escapeCSV(formatDate(job.createdAt, t)),
      escapeCSV(formatDate(job.updatedAt, t)),
      escapeCSV(jobAttachments.map(att => att.filename).join('; '))
    ].join(',')
  })

  const content = [headers.map(escapeCSV).join(','), ...rows].join('\n')
  const timestamp = new Date().toISOString().split('T')[0]
  downloadFile(content, `servicelog-jobs-${timestamp}.csv`, 'text/csv;charset=utf-8;')
}

export function exportDocumentsAsJSON(documents: Document[], t: Translations): void {
  if (documents.length === 0) {
    throw new Error(t.export.noDataToExport)
  }

  const exportData = documents.map(doc => ({
    [t.jobFields.title]: doc.title,
    [t.documents.document]: doc.filename,
    [t.jobFields.createdAt]: formatDate(doc.createdAt, t),
    content: doc.content.substring(0, 500) + (doc.content.length > 500 ? '...' : '')
  }))

  const content = JSON.stringify(exportData, null, 2)
  const timestamp = new Date().toISOString().split('T')[0]
  downloadFile(content, `servicelog-documents-${timestamp}.json`, 'application/json')
}

export function exportDocumentsAsCSV(documents: Document[], t: Translations): void {
  if (documents.length === 0) {
    throw new Error(t.export.noDataToExport)
  }

  const headers = [
    t.jobFields.title,
    t.documents.document,
    t.jobFields.createdAt,
    'Content Preview'
  ]

  const rows = documents.map(doc => [
    escapeCSV(doc.title),
    escapeCSV(doc.filename),
    escapeCSV(formatDate(doc.createdAt, t)),
    escapeCSV(doc.content.substring(0, 500) + (doc.content.length > 500 ? '...' : ''))
  ].join(','))

  const content = [headers.map(escapeCSV).join(','), ...rows].join('\n')
  const timestamp = new Date().toISOString().split('T')[0]
  downloadFile(content, `servicelog-documents-${timestamp}.csv`, 'text/csv;charset=utf-8;')
}

export function exportAllDataAsJSON(
  jobs: Job[],
  documents: Document[],
  attachments: Attachment[],
  t: Translations
): void {
  if (jobs.length === 0 && documents.length === 0) {
    throw new Error(t.export.noDataToExport)
  }

  const exportData = {
    exportDate: new Date().toISOString(),
    summary: {
      totalJobs: jobs.length,
      totalDocuments: documents.length,
      totalAttachments: attachments.length
    },
    jobs: jobs.map(job => {
      const jobAttachments = attachments.filter(att => att.jobId === job.id)
      
      return {
        [t.jobFields.title]: job.title,
        [t.jobFields.customer]: job.customer,
        [t.jobFields.location]: job.location,
        [t.jobFields.machineModel]: job.machineModel,
        [t.jobFields.serialNo]: job.serialNo,
        [t.jobFields.errorCode]: job.errorCode,
        [t.jobFields.symptoms]: job.symptoms,
        [t.jobFields.fix]: job.fix,
        [t.jobFields.status]: getStatusLabel(job.status, t),
        [t.jobFields.createdAt]: formatDate(job.createdAt, t),
        [t.jobFields.updatedAt]: formatDate(job.updatedAt, t),
        [t.attachments.attachments]: jobAttachments.map(att => ({
          filename: att.filename,
          mimeType: att.mimeType,
          createdAt: formatDate(att.createdAt, t)
        }))
      }
    }),
    documents: documents.map(doc => ({
      [t.jobFields.title]: doc.title,
      [t.documents.document]: doc.filename,
      [t.jobFields.createdAt]: formatDate(doc.createdAt, t),
      contentPreview: doc.content.substring(0, 500) + (doc.content.length > 500 ? '...' : '')
    }))
  }

  const content = JSON.stringify(exportData, null, 2)
  const timestamp = new Date().toISOString().split('T')[0]
  downloadFile(content, `servicelog-complete-${timestamp}.json`, 'application/json')
}
