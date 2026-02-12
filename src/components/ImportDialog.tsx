import { useState, useRef } from 'react'
import { useLanguage } from '@/hooks/use-language'
import { Job, Document, Attachment } from '@/lib/types'
import { importDataFromJSON, ImportResult } from '@/lib/import'
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
import { toast } from 'sonner'
import { Upload, FileJs, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (result: ImportResult) => void
}

export function ImportDialog({
  open,
  onOpenChange,
  onImport
}: ImportDialogProps) {
  const { t } = useLanguage()
  const [isImporting, setIsImporting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewResult, setPreviewResult] = useState<ImportResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.json')) {
      toast.error(t.import.invalidFileType)
      return
    }

    setSelectedFile(file)
    
    try {
      const text = await file.text()
      const result = importDataFromJSON(text, t)
      setPreviewResult(result)
    } catch (error) {
      toast.error(t.import.invalidFormat, {
        description: error instanceof Error ? error.message : String(error)
      })
      setSelectedFile(null)
      setPreviewResult(null)
    }
  }

  const handleImport = () => {
    if (!previewResult) return
    
    setIsImporting(true)
    
    try {
      onImport(previewResult)
      handleClose()
    } catch (error) {
      toast.error(t.import.importFailed, {
        description: error instanceof Error ? error.message : String(error)
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreviewResult(null)
    onOpenChange(false)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" weight="fill" />
            {t.import.importData}
          </DialogTitle>
          <DialogDescription>
            {t.import.importDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>{t.import.selectFile}</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={handleButtonClick}
              className="w-full gap-2"
            >
              <FileJs className="w-4 h-4" weight="fill" />
              {selectedFile ? selectedFile.name : t.import.chooseFile}
            </Button>
          </div>

          {previewResult && (
            <div className="space-y-3">
              <Alert className="bg-card border-border">
                <CheckCircle className="w-4 h-4 text-accent" weight="fill" />
                <AlertDescription className="space-y-2">
                  <div className="font-medium">{t.import.previewTitle}</div>
                  <ul className="text-sm space-y-1">
                    <li>• {previewResult.jobs.length} {t.navigation.jobs}</li>
                    <li>• {previewResult.documents.length} {t.navigation.documents}</li>
                    <li>• {previewResult.attachments.length} {t.attachments.attachments}</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert className="bg-muted/50 border-muted-foreground/20">
                <WarningCircle className="w-4 h-4 text-muted-foreground" weight="fill" />
                <AlertDescription className="text-sm text-muted-foreground">
                  {t.import.importWarning}
                </AlertDescription>
              </Alert>
            </div>
          )}

          {!selectedFile && (
            <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md space-y-2">
              <p className="font-medium">{t.import.supportedFormats}</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>{t.import.jsonExported}</li>
                <li>{t.import.fullBackup}</li>
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isImporting}>
            {t.common.cancel}
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!previewResult || isImporting}
            className="gap-2"
          >
            {isImporting ? (
              <>
                <span className="animate-spin">⏳</span>
                {t.import.importing}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {t.common.import}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
