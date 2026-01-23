import { Job } from '@/lib/types'
import { StatusBadge } from './StatusBadge'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/helpers'
import { Wrench } from '@phosphor-icons/react'

interface JobListProps {
  jobs: Job[]
  onSelectJob: (job: Job) => void
  selectedJobId?: string
}

export function JobList({ jobs, onSelectJob, selectedJobId }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center gap-3 text-center">
        <Wrench className="w-12 h-12 text-muted-foreground" />
        <div>
          <h3 className="text-lg font-semibold mb-1">No jobs yet</h3>
          <p className="text-sm text-muted-foreground">Create your first service job to get started</p>
        </div>
      </Card>
    )
  }

  const sortedJobs = [...jobs].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )

  return (
    <div className="flex flex-col gap-3">
      {sortedJobs.map((job) => (
        <Card
          key={job.id}
          className={`p-4 cursor-pointer transition-all duration-200 hover:border-accent/50 hover:shadow-lg ${
            selectedJobId === job.id ? 'border-accent ring-2 ring-accent/20' : ''
          }`}
          onClick={() => onSelectJob(job)}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {job.title || 'Untitled Job'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.customer}
                  {job.location && ` • ${job.location}`}
                </p>
              </div>
              <StatusBadge status={job.status} />
            </div>

            {(job.machineModel || job.errorCode) && (
              <div className="flex flex-wrap gap-2 text-sm">
                {job.machineModel && (
                  <span className="text-muted-foreground">
                    Model: <span className="font-mono text-foreground">{job.machineModel}</span>
                  </span>
                )}
                {job.errorCode && (
                  <span className="text-muted-foreground">
                    Error: <span className="font-mono text-destructive">{job.errorCode}</span>
                  </span>
                )}
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Updated {formatDate(job.updatedAt)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
