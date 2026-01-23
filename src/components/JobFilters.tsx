import { JobStatus } from '@/lib/types'
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

const STATUS_OPTIONS: { value: JobStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export function JobFilters({ filters, onFiltersChange, totalJobs, filteredCount }: JobFiltersProps) {
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
          <h3 className="font-semibold">Filters</h3>
          {isFiltering && (
            <Badge variant="secondary" className="ml-2">
              {filteredCount} of {totalJobs}
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
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <Label className="text-sm font-medium mb-2 block">Status</Label>
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
              From Date
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
              To Date
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
