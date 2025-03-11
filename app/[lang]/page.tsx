import type { Locale } from "@/i18n-config"
import RPECalculator from "@/components/rpe-calculator"
import { getDictionary } from "@/get-dictionary"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen py-8">
      <RPECalculator dictionary={dictionary} lang={lang} />
    </main>
  )
}

