"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locales = [
    { code: "it", label: "Italiano" },
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
    { code: "zh-Hant", label: "繁體中文" },
  ];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocales = ["it", "en", "de", "zh-Hant"];
    
    // Remove the current locale from the URL if it exists
    if (currentLocales.includes(segments[0])) {
      segments.shift();
    }
    
    // Add the new locale, unless it's the default 'it'
    if (newLocale !== "it") {
      segments.unshift(newLocale);
    }
    
    const newPath = "/" + segments.join("/");
    router.push(newPath || "/");
    setOpen(false);
  }

  const currentLabel = locales.find((l) => l.code === locale)?.label || "Italiano";

  return (
    <div ref={ref} className="lang-toggle">
      <button onClick={() => setOpen(!open)} className="lang-btn" aria-label="Language">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{currentLabel}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="lang-dropdown">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`lang-option ${l.code === locale ? "active" : ""}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
