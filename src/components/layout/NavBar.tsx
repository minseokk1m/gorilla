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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white sticky top-0 z-50" style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-xl">🦍</span>
          <span className="font-extrabold text-gray-900 text-[1.05rem] tracking-tight">{t("brand")}</span>
        </Link>
        <nav className="flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3.5 py-1.5 rounded-lg text-[0.8125rem] font-bold transition-colors ${
                isActive(l.href)
                  ? "text-[#0064FF] bg-[#E8F0FE]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={switchLocale}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            {t("switchLang")}
          </button>
        </div>
      </div>
    </header>
  );
}
