import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.piazzaduomotrento.com"),
  title: "Piazza del Duomo di Trento",
  description: "Independent visitor guide to Piazza del Duomo di Trento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
