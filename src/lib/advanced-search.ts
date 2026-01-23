import { Job, Document, SearchResult } from './types'

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
    if (index !== -1 && (index < bestIndex || bestIndex === -1)) {
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

export function extractErrorCodes(jobs: Job[]): string[] {
  const codes = new Set<string>()
  
  for (const job of jobs) {
    if (job.errorCode && job.errorCode.trim()) {
      codes.add(job.errorCode.trim())
    }
  }
  
  return Array.from(codes).sort()
}

export function extractMachineModels(jobs: Job[]): string[] {
  const models = new Set<string>()
  
  for (const job of jobs) {
    if (job.machineModel && job.machineModel.trim()) {
      models.add(job.machineModel.trim())
    }
  }
  
  return Array.from(models).sort()
}

export function searchByErrorCode(jobs: Job[], documents: Document[], errorCode: string): SearchResult[] {
  if (!errorCode.trim()) return []
  
  const lowerQuery = errorCode.toLowerCase()
  const results: SearchResult[] = []
  
  for (const job of jobs) {
    const jobErrorCode = (job.errorCode || '').toLowerCase()
    const searchableText = [
      job.title,
      job.errorCode,
      job.symptoms,
      job.fix,
      job.machineModel
    ].join(' ').toLowerCase()
    
    if (jobErrorCode.includes(lowerQuery) || searchableText.includes(lowerQuery)) {
      const snippetText = [
        job.errorCode && `Error Code: ${job.errorCode}`,
        job.machineModel && `Model: ${job.machineModel}`,
        job.symptoms && `Symptoms: ${job.symptoms}`,
        job.fix && `Fix: ${job.fix}`
      ].filter(Boolean).join(' | ')
      
      results.push({
        kind: 'job',
        id: job.id,
        title: job.title || `${job.customer} - ${job.machineModel}`,
        snippet: createSnippet(snippetText || job.title, errorCode, 200)
      })
    }
  }
  
  for (const doc of documents) {
    const contentMatch = doc.content.toLowerCase().includes(lowerQuery)
    const titleMatch = doc.title.toLowerCase().includes(lowerQuery)
    
    if (contentMatch || titleMatch) {
      results.push({
        kind: 'document',
        id: doc.id,
        title: doc.title,
        snippet: createSnippet(doc.content, errorCode, 200)
      })
    }
  }
  
  return results
}

export function searchByMachineModel(jobs: Job[], documents: Document[], machineModel: string): SearchResult[] {
  if (!machineModel.trim()) return []
  
  const lowerQuery = machineModel.toLowerCase()
  const results: SearchResult[] = []
  
  for (const job of jobs) {
    const jobModel = (job.machineModel || '').toLowerCase()
    const searchableText = [
      job.title,
      job.machineModel,
      job.serialNo,
      job.errorCode,
      job.symptoms,
      job.fix
    ].join(' ').toLowerCase()
    
    if (jobModel.includes(lowerQuery) || searchableText.includes(lowerQuery)) {
      const snippetText = [
        job.machineModel && `Model: ${job.machineModel}`,
        job.serialNo && `S/N: ${job.serialNo}`,
        job.errorCode && `Error: ${job.errorCode}`,
        job.symptoms && `Symptoms: ${job.symptoms}`,
        job.fix && `Fix: ${job.fix}`
      ].filter(Boolean).join(' | ')
      
      results.push({
        kind: 'job',
        id: job.id,
        title: job.title || `${job.customer} - ${job.machineModel}`,
        snippet: createSnippet(snippetText || job.title, machineModel, 200)
      })
    }
  }
  
  for (const doc of documents) {
    const contentMatch = doc.content.toLowerCase().includes(lowerQuery)
    const titleMatch = doc.title.toLowerCase().includes(lowerQuery)
    
    if (contentMatch || titleMatch) {
      results.push({
        kind: 'document',
        id: doc.id,
        title: doc.title,
        snippet: createSnippet(doc.content, machineModel, 200)
      })
    }
  }
  
  return results
}
