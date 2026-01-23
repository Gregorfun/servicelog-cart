import { useState } from 'react'
import { Job } from '@/lib/types'
import { JobTemplate, TEMPLATE_CATEGORIES, createTemplateFromJob } from '@/lib/job-templates'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FloppyDisk } from '@phosphor-icons/react'

interface SaveJobAsTemplateProps {
  job: Job
  open: boolean
  onClose: () => void
  onSave: (template: JobTemplate) => void
}

export function SaveJobAsTemplate({ job, open, onClose, onSave }: SaveJobAsTemplateProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Custom')

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      return
    }

    const template = createTemplateFromJob(job, name, description, category)
    onSave(template)
    
    setName('')
    setDescription('')
    setCategory('Custom')
    onClose()
  }

  const handleCancel = () => {
    setName('')
    setDescription('')
    setCategory('Custom')
    onClose()
  }

  const availableCategories = TEMPLATE_CATEGORIES.filter(cat => cat !== 'All')

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Save Job as Template</DialogTitle>
          <DialogDescription>
            Create a reusable template from this job. Customer, location, and serial number will be cleared for future use.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              placeholder="e.g., Motor Bearing Replacement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="template-description">Description</Label>
            <Textarea
              id="template-description"
              placeholder="Brief description of what this template is for"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="template-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="template-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-muted rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Template will include:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Title: {job.title}</li>
              <li>• Machine Model: {job.machineModel || 'Not set'}</li>
              <li>• Error Code: {job.errorCode || 'Not set'}</li>
              <li>• Symptoms description</li>
              <li>• Fix description</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name.trim() || !description.trim()}
            className="gap-2"
          >
            <FloppyDisk className="w-4 h-4" />
            Save Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
