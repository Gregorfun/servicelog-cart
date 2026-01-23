import { Job, Document, SearchResult } from './types'
import type { JobStatus } from './types'

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    let text = ''
    const decoder = new TextDecoder('utf-8')
    
    const pdfText = decoder.decode(uint8Array)
    const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g
    let match
    
    while ((match = streamRegex.exec(pdfText)) !== null) {
      const streamContent = match[1]
      const cleanText = streamContent
        .replace(/[^\x20-\x7E\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
      
      if (cleanText.length > 10) {
        text += cleanText + ' '
      }
    }
    
    const textObjRegex = /\(([^)]+)\)/g
    while ((match = textObjRegex.exec(pdfText)) !== null) {
      const content = match[1]
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '')
        .replace(/\\t/g, ' ')
        .replace(/\\\\/g, '\\')
        .replace(/\\([()])/g, '$1')
      
      text += content + ' '
    }
    
    text = text
      .replace(/\s+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
    
    if (text.length < 50) {
      return `${file.name} - Content extraction limited. This PDF may use complex encoding or be image-based.`
    }
    
    return text
  } catch (error) {
    console.error('PDF extraction error:', error)
    return `${file.name} - Unable to extract text from this PDF file.`
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1])
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: mimeType })
}

export function downloadFile(base64: string, filename: string, mimeType: string) {
  const blob = base64ToBlob(base64, mimeType)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function createSnippet(text: string, query: string, maxLength: number = 160): string {
  if (!text || !query) return text.slice(0, maxLength) + (text.length > maxLength ? '…' : '')
  
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const queryTerms = lowerQuery.split(/\s+/).filter(t => t.length > 0)
  
  let bestIndex = -1
  let bestScore = -1
  
  for (const term of queryTerms) {
    const index = lowerText.indexOf(term)
    if (index !== -1 && index < bestIndex || bestIndex === -1) {
      const score = queryTerms.filter(t => {
        const termIndex = lowerText.indexOf(t, Math.max(0, index - 50))
        return termIndex !== -1 && termIndex < index + 100
      }).length
      
      if (score > bestScore) {
        bestScore = score
        bestIndex = index
      }
    }
  }
  
  if (bestIndex === -1) {
    return text.slice(0, maxLength) + (text.length > maxLength ? '…' : '')
  }
  
  const contextStart = Math.max(0, bestIndex - 50)
  const contextEnd = Math.min(text.length, bestIndex + maxLength - 50)
  
  let snippet = text.slice(contextStart, contextEnd)
  
  if (contextStart > 0) snippet = '…' + snippet
  if (contextEnd < text.length) snippet = snippet + '…'
  
  for (const term of queryTerms) {
    if (term.length > 0) {
      const regex = new RegExp(`(${escapeRegex(term)})`, 'gi')
      snippet = snippet.replace(regex, '<mark>$1</mark>')
    }
  }
  
  return snippet
}

export function searchJobs(jobs: Job[], query: string): SearchResult[] {
  if (!query.trim()) return []
  
  const lowerQuery = query.toLowerCase()
  const results: SearchResult[] = []
  
  for (const job of jobs) {
    const searchableText = [
      job.title,
      job.customer,
      job.machineModel,
      job.errorCode,
      job.symptoms,
      job.fix,
      job.location,
      job.serialNo
    ].join(' ').toLowerCase()
    
    if (searchableText.includes(lowerQuery)) {
      const snippetText = [
        job.errorCode && `Error: ${job.errorCode}`,
        job.symptoms && `Symptoms: ${job.symptoms}`,
        job.fix && `Fix: ${job.fix}`
      ].filter(Boolean).join(' | ')
      
      results.push({
        kind: 'job',
        id: job.id,
        title: job.title || `Job for ${job.customer}`,
        snippet: createSnippet(snippetText || job.title, query, 160)
      })
    }
  }
  
  return results
}

export function searchDocuments(documents: Document[], query: string): SearchResult[] {
  if (!query.trim()) return []
  
  const lowerQuery = query.toLowerCase()
  const results: SearchResult[] = []
  
  for (const doc of documents) {
    const titleMatch = doc.title.toLowerCase().includes(lowerQuery)
    const contentMatch = doc.content.toLowerCase().includes(lowerQuery)
    
    if (titleMatch || contentMatch) {
      results.push({
        kind: 'document',
        id: doc.id,
        title: doc.title,
        snippet: createSnippet(doc.content, query, 200)
      })
    }
  }
  
  return results
}

export function performSearch(jobs: Job[], documents: Document[], query: string): SearchResult[] {
  const jobResults = searchJobs(jobs, query)
  const docResults = searchDocuments(documents, query)
  
  return [...docResults, ...jobResults]
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export interface JobFilterOptions {
  statuses: JobStatus[]
  dateFrom: string
  dateTo: string
}

export function filterJobs(jobs: Job[], filters: JobFilterOptions): Job[] {
  let filtered = [...jobs]

  if (filters.statuses.length > 0) {
    filtered = filtered.filter((job) => filters.statuses.includes(job.status))
  }

  if (filters.dateFrom) {
    const fromDate = new Date(filters.dateFrom)
    fromDate.setHours(0, 0, 0, 0)
    filtered = filtered.filter((job) => {
      const jobDate = new Date(job.createdAt)
      return jobDate >= fromDate
    })
  }

  if (filters.dateTo) {
    const toDate = new Date(filters.dateTo)
    toDate.setHours(23, 59, 59, 999)
    filtered = filtered.filter((job) => {
      const jobDate = new Date(job.createdAt)
      return jobDate <= toDate
    })
  }

  return filtered
}

export type SortField = 'date' | 'customer' | 'status' | 'status-date'
export type SortDirection = 'asc' | 'desc'

export interface SortOption {
  field: SortField
  direction: SortDirection
}

const STATUS_ORDER: Record<JobStatus, number> = {
  'in-progress': 0,
  'open': 1,
  'completed': 2,
  'cancelled': 3
}

export function sortJobs(jobs: Job[], sortOption: SortOption): Job[] {
  const sorted = [...jobs]
  
  sorted.sort((a, b) => {
    let comparison = 0
    
    switch (sortOption.field) {
      case 'date':
        const dateA = new Date(a.updatedAt).getTime()
        const dateB = new Date(b.updatedAt).getTime()
        comparison = dateA - dateB
        break
      
      case 'customer':
        comparison = a.customer.localeCompare(b.customer, 'de-DE', { sensitivity: 'base' })
        break
      
      case 'status':
        comparison = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
        break
      
      case 'status-date':
        const statusComparison = STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
        if (statusComparison !== 0) {
          comparison = statusComparison
        } else {
          const dateCompA = new Date(a.updatedAt).getTime()
          const dateCompB = new Date(b.updatedAt).getTime()
          comparison = dateCompB - dateCompA
        }
        break
    }
    
    return sortOption.direction === 'asc' ? comparison : -comparison
  })
  
  return sorted
}
