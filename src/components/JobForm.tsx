import { useState } from 'react'
import { Job, JobStatus } from '@/lib/types'
import { generateId } from '@/lib/helpers'
import { JobTemplate } from '@/lib/job-templates'
import { JobTemplatePicker } from '@/components/JobTemplatePicker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Plus, FloppyDisk, Files } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface JobFormProps {
  onSubmit: (job: Job) => void
  initialData?: Job
  submitLabel?: string
  customTemplates?: JobTemplate[]
  onDeleteCustomTemplate?: (templateId: string) => void
}

export function JobForm({ onSubmit, initialData, submitLabel = 'Create Job', customTemplates = [], onDeleteCustomTemplate }: JobFormProps) {
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [formData, setFormData] = useState<Partial<Job>>(
    initialData || {
      title: '',
      customer: '',
      location: '',
      machineModel: '',
      serialNo: '',
      errorCode: '',
      symptoms: '',
      fix: '',
      status: 'open'
    }
  )

  const handleTemplateSelect = (template: JobTemplate) => {
    setFormData(prev => ({
      ...prev,
      ...template.data
    }))
    toast.success('Template applied!', {
      description: `${template.name} template loaded. Fill in customer details.`
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const now = new Date().toISOString()
    const job: Job = {
      id: initialData?.id || generateId(),
      createdAt: initialData?.createdAt || now,
      updatedAt: now,
      title: formData.title || '',
      customer: formData.customer || '',
      location: formData.location || '',
      machineModel: formData.machineModel || '',
      serialNo: formData.serialNo || '',
      errorCode: formData.errorCode || '',
      symptoms: formData.symptoms || '',
      fix: formData.fix || '',
      status: formData.status || 'open'
    }
    
    onSubmit(job)
    
    if (!initialData) {
      setFormData({
        title: '',
        customer: '',
        location: '',
        machineModel: '',
        serialNo: '',
        errorCode: '',
        symptoms: '',
        fix: '',
        status: 'open'
      })
    }
  }

  const updateField = (field: keyof Job, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!initialData && (
            <div className="flex gap-2 pb-4 border-b border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowTemplatePicker(true)}
                className="gap-2 flex-1"
              >
                <Files className="w-4 h-4" />
                Use Template
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g., Repair hydraulic pump"
              required
            />
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="customer">Customer *</Label>
            <Input
              id="customer"
              value={formData.customer || ''}
              onChange={(e) => updateField('customer', e.target.value)}
              placeholder="Customer name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ''}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Site location"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="machineModel">Machine Model</Label>
            <Input
              id="machineModel"
              value={formData.machineModel || ''}
              onChange={(e) => updateField('machineModel', e.target.value)}
              placeholder="e.g., XL-2000"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="serialNo">Serial Number</Label>
            <Input
              id="serialNo"
              value={formData.serialNo || ''}
              onChange={(e) => updateField('serialNo', e.target.value)}
              placeholder="Serial number"
              className="font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="errorCode">Error Code</Label>
          <Input
            id="errorCode"
            value={formData.errorCode || ''}
            onChange={(e) => updateField('errorCode', e.target.value)}
            placeholder="e.g., E-402"
            className="font-mono"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="symptoms">Symptoms</Label>
          <Textarea
            id="symptoms"
            value={formData.symptoms || ''}
            onChange={(e) => updateField('symptoms', e.target.value)}
            placeholder="Describe the problem..."
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="fix">Fix / Solution</Label>
          <Textarea
            id="fix"
            value={formData.fix || ''}
            onChange={(e) => updateField('fix', e.target.value)}
            placeholder="Describe the solution..."
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status || 'open'}
            onValueChange={(value) => updateField('status', value as JobStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="gap-2">
          {initialData ? <FloppyDisk className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {submitLabel}
        </Button>
      </form>
    </Card>

    {showTemplatePicker && (
      <JobTemplatePicker
        onSelect={handleTemplateSelect}
        onClose={() => setShowTemplatePicker(false)}
        customTemplates={customTemplates}
        onDeleteCustomTemplate={onDeleteCustomTemplate}
      />
    )}
    </>
  )
}
