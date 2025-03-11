"use client"

import { usePathname, useRouter } from "next/navigation"
import type { Locale } from "@/i18n-config"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguageSwitcherProps {
  lang: Locale
  label: string
}

export function LanguageSwitcher({ lang, label }: LanguageSwitcherProps) {
  const pathName = usePathname()
  const router = useRouter()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/"
    const segments = pathName.split("/")
    segments[1] = locale
    return segments.join("/")
  }

  return (
    <div className="flex items-center gap-2">
      <Select
        defaultValue={lang}
        onValueChange={(value) => {
          router.push(redirectedPathName(value))
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pl">Polski</SelectItem>
          <SelectItem value="de">Deutsch</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="ja">日本語</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

