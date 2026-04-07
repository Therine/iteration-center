import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-CRM Iteration Board",
  description: "U of M Strategic Velocity Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}