import { Contact as ContactBlock } from "../components"
import { useTranslation } from "react-i18next"

export function ContactPage({ isDark }: { isDark: boolean }) {
  const { t } = useTranslation()
  return (
    <section className="mt-10">
      <h1 className="text-lg font-semibold mb-4">{t('nav.contact')}</h1>
      <ContactBlock isDark={isDark} />
    </section>
  )
} 