import { JobStatus } from '@/lib/types'
import { useLanguage } from '@/hooks/use-language'
import { cn } from '@/lib/utils'
import { Check, Clock, X, Circle } from '@phosphor-icons/react'

interface StatusBadgeProps {
  status: JobStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { t } = useLanguage()

  const statusConfig: Record<JobStatus, { label: string; icon: React.ReactNode; colorClass: string }> = {
    'open': {
      label: t.status.open,
      icon: <Circle weight="fill" className="w-3 h-3" />,
      colorClass: 'bg-[var(--status-open)] text-[var(--accent-foreground)]'
    },
    'in-progress': {
      label: t.status.progress,
      icon: <Clock weight="fill" className="w-3 h-3" />,
      colorClass: 'bg-[var(--status-progress)] text-[var(--accent-foreground)]'
    },
    'completed': {
      label: t.status.completed,
      icon: <Check weight="bold" className="w-3 h-3" />,
      colorClass: 'bg-[var(--status-completed)] text-[var(--accent-foreground)]'
    },
    'cancelled': {
      label: t.status.cancelled,
      icon: <X weight="bold" className="w-3 h-3" />,
      colorClass: 'bg-[var(--status-cancelled)] text-white'
    }
  }

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
