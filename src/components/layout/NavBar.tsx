"use client";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

export default function NavBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: "/" as const, label: t("dashboard") },
    { href: "/firms" as const, label: t("firms") },
    { href: "/learn" as const, label: t("learn") },
  ];

  function switchLocale() {
    const next = locale === "en" ? "ko" : "en";
    router.replace(pathname, { locale: next });
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🦍</span>
          <span className="font-bold text-white text-lg tracking-tight">{t("brand")}</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500 hidden sm:block">{t("tagline")}</span>
          <button
            onClick={switchLocale}
            className="text-xs font-medium px-3 py-1.5 rounded-md border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
          >
            {t("switchLang")}
          </button>
        </div>
      </div>
    </header>
  );
}
