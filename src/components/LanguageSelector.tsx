import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Translate, Check } from '@phosphor-icons/react'

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title={t.language.changeLanguage}>
          <Translate className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className="gap-2 cursor-pointer"
        >
          {language === 'en' && <Check className="w-4 h-4" />}
          {language !== 'en' && <span className="w-4" />}
          {t.language.english}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('de')}
          className="gap-2 cursor-pointer"
        >
          {language === 'de' && <Check className="w-4 h-4" />}
          {language !== 'de' && <span className="w-4" />}
          {t.language.german}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
