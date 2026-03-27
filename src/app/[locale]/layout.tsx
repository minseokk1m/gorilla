import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/layout/NavBar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "ko")) notFound();

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <NextIntlClientProvider messages={messages}>
      <TooltipProvider>
        <NavBar />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-zinc-800 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-600">
            {t("disclaimer")}
          </div>
        </footer>
      </TooltipProvider>
    </NextIntlClientProvider>
  );
}
