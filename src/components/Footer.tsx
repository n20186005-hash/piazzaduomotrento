import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const prefix = locale === "it" ? "" : `/${locale}`;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link href={`${prefix}/privacy-policy`}>{t("privacy")}</Link>
          <Link href={`${prefix}/terms-of-service`}>{t("terms")}</Link>
          <Link href={`${prefix}/cookie-settings`}>{t("cookies")}</Link>
        </div>
        <p className="footer-support">
          {t("support")}{" "}
          <a href="mailto:claritleonelmnicol@gmail.com">claritleonelmnicol@gmail.com</a>
        </p>
        <p className="footer-rights">{t("rights")}</p>
      </div>
    </footer>
  );
}
