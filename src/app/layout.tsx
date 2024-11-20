import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Guesser!",
  description: "Guess the Brand Colours!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en ">
      <body className="antialiased bg-slate-950"
      >
        {children}
      </body>
    </html>
  );
}
