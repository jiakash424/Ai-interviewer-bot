import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interview Bot — Practice with Your AI Interviewer",
  description: "Practice job interviews with an AI that adapts, evaluates, and helps you improve. Real-time feedback, voice support, and performance tracking.",
  keywords: ["AI Interview", "Mock Interview", "Interview Practice", "AI Interviewer", "Job Preparation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0F172A] text-slate-200`}
      >
        {children}
      </body>
    </html>
  );
}
