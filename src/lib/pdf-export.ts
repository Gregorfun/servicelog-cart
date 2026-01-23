import { Job, Document, Attachment } from './types'
import { Translations } from './i18n'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
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

export function generateJobPDF(job: Job, attachments: Attachment[], t: Translations): void {
  const doc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${t.job.jobDetails} - ${job.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
      padding: 40px; 
      line-height: 1.6; 
      color: #333;
    }
    .header { 
      border-bottom: 3px solid #2563eb; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    .header h1 { 
      font-size: 28px; 
      color: #1e40af; 
      margin-bottom: 10px; 
    }
    .header .meta { 
      color: #6b7280; 
      font-size: 14px; 
    }
    .section { 
      margin-bottom: 25px; 
      padding: 20px; 
      background: #f9fafb; 
      border-radius: 8px; 
      border-left: 4px solid #2563eb; 
    }
    .section h2 { 
      font-size: 18px; 
      color: #1f2937; 
      margin-bottom: 12px; 
      text-transform: uppercase; 
      letter-spacing: 0.5px; 
    }
    .field { 
      margin-bottom: 15px; 
    }
    .field-label { 
      font-weight: 600; 
      color: #4b5563; 
      margin-bottom: 4px; 
      font-size: 13px; 
      text-transform: uppercase; 
      letter-spacing: 0.3px; 
    }
    .field-value { 
      color: #1f2937; 
      font-size: 15px; 
      white-space: pre-wrap; 
      word-wrap: break-word; 
    }
    .status-badge { 
      display: inline-block; 
      padding: 6px 12px; 
      border-radius: 6px; 
      font-weight: 600; 
      font-size: 13px; 
      text-transform: uppercase; 
      letter-spacing: 0.5px; 
    }
    .status-open { background: #fef3c7; color: #92400e; }
    .status-progress { background: #dbeafe; color: #1e40af; }
    .status-completed { background: #d1fae5; color: #065f46; }
    .status-cancelled { background: #fee2e2; color: #991b1b; }
    .attachment-list { 
      list-style: none; 
      padding: 0; 
    }
    .attachment-item { 
      padding: 10px; 
      background: white; 
      margin-bottom: 8px; 
      border-radius: 6px; 
      border: 1px solid #e5e7eb; 
      font-size: 14px; 
    }
    .footer { 
      margin-top: 50px; 
      padding-top: 20px; 
      border-top: 1px solid #e5e7eb; 
      text-align: center; 
      color: #9ca3af; 
      font-size: 12px; 
    }
    @media print {
      body { padding: 20px; }
      .section { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${job.title}</h1>
    <div class="meta">
      ${t.jobFields.createdAt}: ${formatDate(job.createdAt)} | 
      ${t.jobFields.updatedAt}: ${formatDate(job.updatedAt)}
    </div>
  </div>

  <div class="section">
    <h2>${t.jobFields.status}</h2>
    <span class="status-badge status-${job.status}">${getStatusLabel(job.status, t)}</span>
  </div>

  <div class="section">
    <h2>${t.jobFields.customer} & ${t.jobFields.location}</h2>
    <div class="field">
      <div class="field-label">${t.jobFields.customer}</div>
      <div class="field-value">${job.customer || '-'}</div>
    </div>
    <div class="field">
      <div class="field-label">${t.jobFields.location}</div>
      <div class="field-value">${job.location || '-'}</div>
    </div>
  </div>

  <div class="section">
    <h2>${t.jobFields.machineModel} & ${t.jobFields.serialNo}</h2>
    <div class="field">
      <div class="field-label">${t.jobFields.machineModel}</div>
      <div class="field-value">${job.machineModel || '-'}</div>
    </div>
    <div class="field">
      <div class="field-label">${t.jobFields.serialNo}</div>
      <div class="field-value">${job.serialNo || '-'}</div>
    </div>
    <div class="field">
      <div class="field-label">${t.jobFields.errorCode}</div>
      <div class="field-value">${job.errorCode || '-'}</div>
    </div>
  </div>

  <div class="section">
    <h2>${t.jobFields.symptoms}</h2>
    <div class="field-value">${job.symptoms || '-'}</div>
  </div>

  <div class="section">
    <h2>${t.jobFields.fix}</h2>
    <div class="field-value">${job.fix || '-'}</div>
  </div>

  ${attachments.length > 0 ? `
  <div class="section">
    <h2>${t.attachments.attachments} (${attachments.length})</h2>
    <ul class="attachment-list">
      ${attachments.map(att => `
        <li class="attachment-item">
          📎 ${att.filename} (${att.mimeType})
        </li>
      `).join('')}
    </ul>
  </div>
  ` : ''}

  <div class="footer">
    ${t.app.title} - ${new Date().toLocaleDateString()}
  </div>
</body>
</html>
`

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(doc)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}

export function generateDocumentPDF(document: Document, t: Translations): void {
  const doc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${document.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
      padding: 40px; 
      line-height: 1.6; 
      color: #333;
    }
    .header { 
      border-bottom: 3px solid #2563eb; 
      padding-bottom: 20px; 
      margin-bottom: 30px; 
    }
    .header h1 { 
      font-size: 28px; 
      color: #1e40af; 
      margin-bottom: 10px; 
    }
    .header .meta { 
      color: #6b7280; 
      font-size: 14px; 
    }
    .content { 
      padding: 20px; 
      background: #f9fafb; 
      border-radius: 8px; 
      border-left: 4px solid #2563eb; 
      white-space: pre-wrap; 
      word-wrap: break-word; 
      font-size: 14px; 
      line-height: 1.8; 
    }
    .footer { 
      margin-top: 50px; 
      padding-top: 20px; 
      border-top: 1px solid #e5e7eb; 
      text-align: center; 
      color: #9ca3af; 
      font-size: 12px; 
    }
    @media print {
      body { padding: 20px; }
      .content { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${document.title}</h1>
    <div class="meta">
      ${t.documents.document}: ${document.filename} | 
      ${t.jobFields.createdAt}: ${formatDate(document.createdAt)}
    </div>
  </div>

  <div class="content">
    ${document.content || t.documents.noDocuments}
  </div>

  <div class="footer">
    ${t.app.title} - ${new Date().toLocaleDateString()}
  </div>
</body>
</html>
`

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(doc)
    printWindow.document.close()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}
