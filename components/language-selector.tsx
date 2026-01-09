"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import type { Language } from "@/lib/translations"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "it" as Language, name: "Italiano", flag: "🇮🇹" },
  { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
  { code: "ms" as Language, name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
  { code: "ar" as Language, name: "العربية", flag: "🇸🇦" },
  { code: "tl" as Language, name: "Tagalog", flag: "🇵🇭" },
  { code: "vi" as Language, name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "hi" as Language, name: "हिन्दी", flag: "🇮🇳" },
  { code: "th" as Language, name: "ไทย", flag: "🇹🇭" },
  { code: "ko" as Language, name: "한국어", flag: "🇰🇷" },
]

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const currentLang = languages.find((l) => l.code === currentLanguage) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-sm bg-transparent">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {currentLang.flag} {currentLang.name}
          </span>
          <span className="sm:hidden">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code)}
            className={`cursor-pointer ${currentLanguage === lang.code ? "bg-primary/10" : ""}`}
          >
            <span className="mr-2 text-lg">{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
