import { useState } from 'react'
import { Document } from '@/lib/types'
import { extractTextFromPDF, fileToBase64, generateId } from '@/lib/helpers'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { FilePdf, Upload, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface DocumentUploadProps {
  onUpload: (document: Document) => void
}

type UploadStatus = 'idle' | 'uploading' | 'extracting' | 'success' | 'error'

export function DocumentUpload({ onUpload }: DocumentUploadProps) {
  const [title, setTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    if (!file.type.includes('pdf')) {
      toast.error('Only PDF files are supported')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 10MB')
      return
    }

    setSelectedFile(file)
    if (!title) {
      setTitle(file.name.replace('.pdf', ''))
    }
    setStatus('idle')
    setErrorMessage('')
  }

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast.error('Please provide a title and select a PDF file')
      return
    }

    try {
      setStatus('uploading')
      setProgress(30)

      const base64Data = await fileToBase64(selectedFile)
      
      setStatus('extracting')
      setProgress(60)

      const extractedText = await extractTextFromPDF(selectedFile)

      setProgress(90)

      const document: Document = {
        id: generateId(),
        title: title.trim(),
        filename: selectedFile.name,
        content: extractedText,
        createdAt: new Date().toISOString()
      }

      onUpload(document)

      setProgress(100)
      setStatus('success')
      toast.success(`Document "${title}" indexed successfully`)

      setTimeout(() => {
        setTitle('')
        setSelectedFile(null)
        setStatus('idle')
        setProgress(0)
        const fileInput = window.document.getElementById('pdf-upload') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      }, 2000)
    } catch (error) {
      console.error('Upload error:', error)
      setStatus('error')
      setErrorMessage('Failed to process PDF. Please try again.')
      toast.error('Failed to process PDF')
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...'
      case 'extracting':
        return 'Extracting text content...'
      case 'success':
        return 'Document indexed successfully!'
      case 'error':
        return errorMessage || 'An error occurred'
      default:
        return ''
    }
  }

  const isProcessing = status === 'uploading' || status === 'extracting'

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-primary/10">
          <FilePdf className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Import PDF Document</h2>
          <p className="text-sm text-muted-foreground">
            Upload technical manuals and documentation for searchable reference
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="doc-title">Document Title *</Label>
          <Input
            id="doc-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., XL-2000 Service Manual"
            disabled={isProcessing}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="pdf-upload">PDF File *</Label>
          <Input
            id="pdf-upload"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            disabled={isProcessing}
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {status !== 'idle' && (
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              {status === 'success' && <CheckCircle className="w-5 h-5 text-[var(--status-completed)]" weight="fill" />}
              {status === 'error' && <WarningCircle className="w-5 h-5 text-destructive" weight="fill" />}
              {isProcessing && (
                <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              )}
              <span className={`text-sm font-medium ${
                status === 'success' ? 'text-[var(--status-completed)]' : 
                status === 'error' ? 'text-destructive' : 
                'text-foreground'
              }`}>
                {getStatusMessage()}
              </span>
            </div>
            {isProcessing && <Progress value={progress} className="h-2" />}
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !title.trim() || isProcessing}
          className="gap-2"
        >
          <Upload className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Upload & Index'}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Only PDF files are supported (max 10MB)</p>
          <p>• Text will be extracted and indexed for full-text search</p>
          <p>• Scanned/image-based PDFs may have limited text extraction</p>
        </div>
      </div>
    </Card>
  )
}
