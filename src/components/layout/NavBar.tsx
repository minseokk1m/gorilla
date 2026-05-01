"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/routing";

export default function NavBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/" as const, label: t("dashboard") },
    { href: "/firms" as const, label: t("firms") },
    { href: "/ecosystems" as const, label: t("ecosystems") },
    { href: "/categories" as const, label: t("categories") },
    { href: "/learn" as const, label: t("learn") },
    { href: "/discuss" as const, label: t("discuss") },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🦍</span>
          <span className="font-extrabold text-gray-900 text-[1.05rem] tracking-tight">{t("brand")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={switchLocale}
            className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            {t("switchLang")}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive(l.href)
                    ? "text-[#0064FF] bg-[#E8F0FE]"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
