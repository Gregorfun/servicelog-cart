import { useState } from 'react'
import { JobTemplate, JOB_TEMPLATES, TEMPLATE_CATEGORIES, TemplateCategory } from '@/lib/job-templates'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Drop, 
  ThermometerSimple, 
  GitBranch, 
  ArrowsHorizontal, 
  Cpu, 
  Circle, 
  Wind,
  Lightning,
  CornersOut,
  Upload,
  Wrench,
  Warning,
  Barcode,
  Funnel,
  MagnifyingGlass,
  X,
  Star,
  Trash
} from '@phosphor-icons/react'

const ICON_MAP: Record<string, React.ElementType> = {
  Drop,
  ThermometerSimple,
  GitBranch,
  ArrowsHorizontal,
  Cpu,
  Circle,
  Wind,
  Valve: Circle,
  Lightning,
  CornersOut,
  Upload,
  Wrench,
  Warning,
  Barcode,
  Funnel,
  Star
}

interface JobTemplatePickerProps {
  onSelect: (template: JobTemplate) => void
  onClose: () => void
  customTemplates?: JobTemplate[]
  onDeleteCustomTemplate?: (templateId: string) => void
}

export function JobTemplatePicker({ onSelect, onClose, customTemplates = [], onDeleteCustomTemplate }: JobTemplatePickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const allTemplates = [...customTemplates, ...JOB_TEMPLATES]

  const filteredTemplates = allTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSelectTemplate = (template: JobTemplate) => {
    onSelect(template)
    onClose()
  }

  const handleDeleteTemplate = (e: React.MouseEvent, templateId: string) => {
    e.stopPropagation()
    if (onDeleteCustomTemplate) {
      onDeleteCustomTemplate(templateId)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">Job Templates</h2>
            <p className="text-sm text-muted-foreground">
              Select a template to quickly start a new job with pre-filled information
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 border-b border-border flex flex-col gap-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {TEMPLATE_CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No templates found matching your search</p>
              </div>
            ) : (
              filteredTemplates.map((template) => {
                const Icon = ICON_MAP[template.icon] || Wrench
                return (
                  <Card
                    key={template.id}
                    className="p-4 hover:border-accent hover:bg-card/50 cursor-pointer transition-all group"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon className="w-5 h-5" weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-sm leading-tight">
                            {template.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0">
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                            {template.isCustom && onDeleteCustomTemplate && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => handleDeleteTemplate(e, template.id)}
                              >
                                <Trash className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {template.description}
                        </p>
                        {template.data.errorCode && (
                          <div className="mt-2">
                            <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                              {template.data.errorCode}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
          </p>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )
}
