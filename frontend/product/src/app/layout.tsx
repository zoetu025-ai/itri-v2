import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.scss";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-family-base",
});

export const metadata: Metadata = {
  title: "iCourt",
  description: "Welcome to iCourt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.variable}>{children}</body>
    </html>
  );
}
