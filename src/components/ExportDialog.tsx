import { useState } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { Job, Document, Attachment } from '@/lib/types'
import {
  exportJobsAsJSON,
  exportJobsAsCSV,
  exportDocumentsAsJSON,
  exportDocumentsAsCSV,
  exportAllDataAsJSON,
  ExportFormat
} from '@/lib/export'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { Download, FileJs, FileCsv } from '@phosphor-icons/react'

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobs: Job[]
  documents: Document[]
  attachments: Attachment[]
}

type ExportType = 'jobs' | 'documents' | 'all'

export function ExportDialog({
  open,
  onOpenChange,
  jobs,
  documents,
  attachments
}: ExportDialogProps) {
  const { t } = useLanguage()
  const [exportType, setExportType] = useState<ExportType>('jobs')
  const [format, setFormat] = useState<ExportFormat>('json')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      if (exportType === 'jobs') {
        if (format === 'json') {
          exportJobsAsJSON(jobs, attachments, t)
        } else {
          exportJobsAsCSV(jobs, attachments, t)
        }
      } else if (exportType === 'documents') {
        if (format === 'json') {
          exportDocumentsAsJSON(documents, t)
        } else {
          exportDocumentsAsCSV(documents, t)
        }
      } else {
        exportAllDataAsJSON(jobs, documents, attachments, t)
      }
      
      toast.success(t.export.exportSuccess)
      onOpenChange(false)
    } catch (error) {
      toast.error(t.export.exportFailed, {
        description: error instanceof Error ? error.message : String(error)
      })
    } finally {
      setIsExporting(false)
    }
  }

  const getExportCount = () => {
    switch (exportType) {
      case 'jobs':
        return jobs.length
      case 'documents':
        return documents.length
      case 'all':
        return jobs.length + documents.length
    }
  }

  const canExport = getExportCount() > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" weight="fill" />
            {t.export.exportData}
          </DialogTitle>
          <DialogDescription>
            {t.export.selectFormat}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>{t.common.export}</Label>
            <RadioGroup value={exportType} onValueChange={(value) => setExportType(value as ExportType)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jobs" id="export-jobs" />
                <Label htmlFor="export-jobs" className="font-normal cursor-pointer">
                  {t.export.exportJobs} ({jobs.length})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="documents" id="export-documents" />
                <Label htmlFor="export-documents" className="font-normal cursor-pointer">
                  {t.export.exportDocuments} ({documents.length})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="export-all" />
                <Label htmlFor="export-all" className="font-normal cursor-pointer">
                  {t.export.exportAll} ({jobs.length + documents.length} {t.filters.results})
                </Label>
              </div>
            </RadioGroup>
          </div>

          {exportType !== 'all' && (
            <div className="space-y-3">
              <Label>{t.export.exportFormat}</Label>
              <RadioGroup value={format} onValueChange={(value) => setFormat(value as ExportFormat)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="json" id="format-json" />
                  <Label htmlFor="format-json" className="font-normal cursor-pointer flex items-center gap-2">
                    <FileJs className="w-4 h-4" weight="fill" />
                    JSON
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="format-csv" />
                  <Label htmlFor="format-csv" className="font-normal cursor-pointer flex items-center gap-2">
                    <FileCsv className="w-4 h-4" weight="fill" />
                    CSV
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {exportType === 'all' && (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {t.export.exportAll} {t.export.exportFormat}: JSON
            </div>
          )}

          {!canExport && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {t.export.noDataToExport}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isExporting}>
            {t.common.cancel}
          </Button>
          <Button onClick={handleExport} disabled={!canExport || isExporting} className="gap-2">
            {isExporting ? (
              <>
                <span className="animate-spin">⏳</span>
                {t.export.exportingData}
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                {t.common.export}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
