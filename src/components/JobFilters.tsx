import { JobStatus } from '@/lib/types'
import { useLanguage } from '@/hooks/use-language'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Funnel, X } from '@phosphor-icons/react'

export interface JobFilterOptions {
  statuses: JobStatus[]
  dateFrom: string
  dateTo: string
}

interface JobFiltersProps {
  filters: JobFilterOptions
  onFiltersChange: (filters: JobFilterOptions) => void
  totalJobs: number
  filteredCount: number
}

export function JobFilters({ filters, onFiltersChange, totalJobs, filteredCount }: JobFiltersProps) {
  const { t } = useLanguage()

  const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
    { value: 'open', label: t.status.open },
    { value: 'in-progress', label: t.status.progress },
    { value: 'completed', label: t.status.completed },
    { value: 'cancelled', label: t.status.cancelled },
  ]

  const handleStatusToggle = (status: JobStatus) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status]
    
    onFiltersChange({ ...filters, statuses: newStatuses })
  }

  const handleDateFromChange = (value: string) => {
    onFiltersChange({ ...filters, dateFrom: value })
  }

  const handleDateToChange = (value: string) => {
    onFiltersChange({ ...filters, dateTo: value })
  }

  const handleClearFilters = () => {
    onFiltersChange({
      statuses: [],
      dateFrom: '',
      dateTo: '',
    })
  }

  const hasActiveFilters = filters.statuses.length > 0 || filters.dateFrom || filters.dateTo
  const isFiltering = totalJobs !== filteredCount

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Funnel className="w-5 h-5 text-muted-foreground" weight="fill" />
          <h3 className="font-semibold">{t.common.filter}</h3>
          {isFiltering && (
            <Badge variant="secondary" className="ml-2">
              {filteredCount} {t.filters.of} {totalJobs}
            </Badge>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="gap-2 h-8"
          >
            <X className="w-4 h-4" />
            {t.filters.clearFilters}
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">{t.jobFields.status}</Label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((option) => {
              const isSelected = filters.statuses.includes(option.value)
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleStatusToggle(option.value)}
                  className="gap-2"
                >
                  {option.label}
                  {isSelected && <X className="w-3 h-3" weight="bold" />}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="date-from" className="text-sm font-medium mb-2 block">
              {t.filters.dateFrom}
            </Label>
            <Input
              id="date-from"
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleDateFromChange(e.target.value)}
              max={filters.dateTo || undefined}
            />
          </div>
          <div>
            <Label htmlFor="date-to" className="text-sm font-medium mb-2 block">
              {t.filters.dateTo}
            </Label>
            <Input
              id="date-to"
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleDateToChange(e.target.value)}
              min={filters.dateFrom || undefined}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
