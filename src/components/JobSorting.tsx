import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, ListNumbers } from '@phosphor-icons/react'

export type SortField = 'date' | 'customer' | 'status' | 'status-date'
export type SortDirection = 'asc' | 'desc'

export interface SortOption {
  field: SortField
  direction: SortDirection
}

interface JobSortingProps {
  sortOption: SortOption
  onSortChange: (option: SortOption) => void
}

export function JobSorting({ sortOption, onSortChange }: JobSortingProps) {
  const handleFieldClick = (field: SortField) => {
    if (sortOption.field === field) {
      onSortChange({
        field,
        direction: sortOption.direction === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSortChange({
        field,
        direction: field === 'date' ? 'desc' : 'asc'
      })
    }
  }

  const isActive = (field: SortField) => sortOption.field === field

  const SortIcon = sortOption.direction === 'asc' ? ArrowUp : ArrowDown

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-muted-foreground">Sort by:</span>
      <div className="flex items-center gap-1">
        <Button
          variant={isActive('status-date') ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFieldClick('status-date')}
          className="gap-1.5"
          title="Sort by status, then by date (multi-column)"
        >
          <ListNumbers className="w-3.5 h-3.5" weight="bold" />
          Status + Date
          {isActive('status-date') && <SortIcon className="w-3.5 h-3.5" weight="bold" />}
        </Button>
        <Button
          variant={isActive('date') ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFieldClick('date')}
          className="gap-1.5"
        >
          Date
          {isActive('date') && <SortIcon className="w-3.5 h-3.5" weight="bold" />}
        </Button>
        <Button
          variant={isActive('customer') ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFieldClick('customer')}
          className="gap-1.5"
        >
          Customer
          {isActive('customer') && <SortIcon className="w-3.5 h-3.5" weight="bold" />}
        </Button>
        <Button
          variant={isActive('status') ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFieldClick('status')}
          className="gap-1.5"
        >
          Status
          {isActive('status') && <SortIcon className="w-3.5 h-3.5" weight="bold" />}
        </Button>
      </div>
    </div>
  )
}
