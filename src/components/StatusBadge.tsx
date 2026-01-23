import { JobStatus } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Check, Clock, X, Circle } from '@phosphor-icons/react'

interface StatusBadgeProps {
  status: JobStatus
  className?: string
}

const statusConfig: Record<JobStatus, { label: string; icon: React.ReactNode; colorClass: string }> = {
  'open': {
    label: 'Open',
    icon: <Circle weight="fill" className="w-3 h-3" />,
    colorClass: 'bg-[var(--status-open)] text-[var(--accent-foreground)]'
  },
  'in-progress': {
    label: 'In Progress',
    icon: <Clock weight="fill" className="w-3 h-3" />,
    colorClass: 'bg-[var(--status-progress)] text-[var(--accent-foreground)]'
  },
  'completed': {
    label: 'Completed',
    icon: <Check weight="bold" className="w-3 h-3" />,
    colorClass: 'bg-[var(--status-completed)] text-[var(--accent-foreground)]'
  },
  'cancelled': {
    label: 'Cancelled',
    icon: <X weight="bold" className="w-3 h-3" />,
    colorClass: 'bg-[var(--status-cancelled)] text-white'
  }
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium transition-colors duration-200',
        config.colorClass,
        className
      )}
    >
      {config.icon}
      {config.label}
    </span>
  )
}
