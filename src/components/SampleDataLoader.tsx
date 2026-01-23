import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Database, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface SampleDataLoaderProps {
  onLoadData: () => void
  hasExistingData: boolean
}

export function SampleDataLoader({ onLoadData, hasExistingData }: SampleDataLoaderProps) {
  const handleLoadSamples = () => {
    onLoadData()
    toast.success('Sample data loaded successfully!', {
      description: '6 jobs with photos and PDF attachments added, plus 5 technical manuals.'
    })
  }

  return (
    <Card className="bg-card/50 border-accent/30">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent/20">
            <Database className="w-5 h-5 text-accent" weight="fill" />
          </div>
          <div>
            <CardTitle className="text-lg">Sample Service Records</CardTitle>
            <CardDescription>
              Load example jobs with photos and PDF attachments
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm text-muted-foreground space-y-2">
          <p>This will add:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>6 realistic service jobs</strong> covering CNC machines, hydraulics, robotics, and more</li>
            <li><strong>15+ attachments</strong> including diagnostic photos and repair reports</li>
            <li><strong>5 technical manuals</strong> with searchable PDF content</li>
          </ul>
          {hasExistingData && (
            <p className="text-accent font-medium mt-3 flex items-center gap-2">
              <Check weight="bold" />
              Sample data will be added to your existing records
            </p>
          )}
        </div>
        <Button 
          onClick={handleLoadSamples}
          className="w-full gap-2"
          size="lg"
        >
          <Database weight="fill" />
          Load Sample Data
        </Button>
      </CardContent>
    </Card>
  )
}
