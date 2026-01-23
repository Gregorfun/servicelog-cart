import { useState } from 'react'
import { Job, Attachment } from '@/lib/types'
import { JobTemplate } from '@/lib/job-templates'
import { useLanguage } from '@/hooks/use-language'
import { generateJobPDF } from '@/lib/pdf-export'
import { JobForm } from './JobForm'
import { SaveJobAsTemplate } from './SaveJobAsTemplate'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusBadge } from './StatusBadge'
import { formatDate, fileToBase64, downloadFile, generateId } from '@/lib/helpers'
import { Trash, Paperclip, Upload, Download, X, FloppyDisk, FilePdf } from '@phosphor-icons/react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface JobDetailProps {
  job: Job
  attachments: Attachment[]
  onUpdate: (job: Job) => void
  onDelete: (jobId: string) => void
  onAddAttachment: (attachment: Attachment) => void
  onDeleteAttachment: (attachmentId: string) => void
  onSaveAsTemplate: (template: JobTemplate) => void
  onClose: () => void
}

export function JobDetail({ 
  job, 
  attachments, 
  onUpdate, 
  onDelete, 
  onAddAttachment, 
  onDeleteAttachment,
  onSaveAsTemplate,
  onClose 
}: JobDetailProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpdate = (updatedJob: Job) => {
    onUpdate(updatedJob)
    setIsEditing(false)
    toast.success('Job updated successfully')
  }

  const handleDelete = () => {
    onDelete(job.id)
    toast.success('Job deleted')
    onClose()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 10MB')
      return
    }

    setIsUploading(true)
    try {
      const base64Data = await fileToBase64(file)
      
      const attachment: Attachment = {
        id: generateId(),
        jobId: job.id,
        filename: file.name,
        mimeType: file.type,
        data: base64Data,
        createdAt: new Date().toISOString()
      }
      
      onAddAttachment(attachment)
      toast.success(`Attached ${file.name}`)
      
      e.target.value = ''
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = (attachment: Attachment) => {
    downloadFile(attachment.data, attachment.filename, attachment.mimeType)
  }

  const handleExportPDF = () => {
    generateJobPDF(job, jobAttachments, t)
    toast.success(t.export.exportSuccess)
  }

  const jobAttachments = attachments.filter(a => a.jobId === job.id)

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{job.title || 'Untitled Job'}</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>Created {formatDate(job.createdAt)}</span>
              <span>•</span>
              <span>Updated {formatDate(job.updatedAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={job.status} />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {!isEditing ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Customer</label>
                <p className="mt-1">{job.customer || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <p className="mt-1">{job.location || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Machine Model</label>
                <p className="mt-1 font-mono">{job.machineModel || '-'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Serial Number</label>
                <p className="mt-1 font-mono">{job.serialNo || '-'}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Error Code</label>
                <p className="mt-1 font-mono text-destructive">{job.errorCode || '-'}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Symptoms</label>
              <p className="mt-1 whitespace-pre-wrap">{job.symptoms || '-'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Fix / Solution</label>
              <p className="mt-1 whitespace-pre-wrap">{job.fix || '-'}</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <Button onClick={() => setIsEditing(true)} variant="default">
                Edit Job
              </Button>
              <Button 
                onClick={handleExportPDF} 
                variant="outline"
                className="gap-2"
              >
                <FilePdf className="w-4 h-4" weight="fill" />
                Export PDF
              </Button>
              <Button 
                onClick={() => setShowSaveTemplateDialog(true)} 
                variant="outline"
                className="gap-2"
              >
                <FloppyDisk className="w-4 h-4" />
                Save as Template
              </Button>
              <Button onClick={() => setShowDeleteDialog(true)} variant="destructive" className="gap-2">
                <Trash className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <JobForm
              initialData={job}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
            />
            <Button onClick={() => setIsEditing(false)} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Paperclip className="w-5 h-5" />
          Attachments ({jobAttachments.length})
        </h3>

        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              accept="image/*,.pdf"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                type="button"
                variant="outline"
                className="gap-2 w-full"
                disabled={isUploading}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <Upload className="w-4 h-4" />
                {isUploading ? 'Uploading...' : 'Add Attachment'}
              </Button>
            </label>
          </div>

          {jobAttachments.length > 0 ? (
            <div className="flex flex-col gap-2">
              {jobAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{attachment.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(attachment.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDownload(attachment)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        onDeleteAttachment(attachment.id)
                        toast.success('Attachment deleted')
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No attachments yet
            </p>
          )}
        </div>
      </Card>

      <SaveJobAsTemplate
        job={job}
        open={showSaveTemplateDialog}
        onClose={() => setShowSaveTemplateDialog(false)}
        onSave={(template) => {
          onSaveAsTemplate(template)
          toast.success('Template saved successfully')
        }}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the job "{job.title}" and all its attachments. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
