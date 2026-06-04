import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "🥑 Sanciones",
  description:
    "Streamline document management for administrators by reviewing, editing, and approving contractor submissions with a user-friendly interface.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
