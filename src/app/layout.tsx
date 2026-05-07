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
  title: "Todo GStack",
  description: "Minimal todo list app with local persistence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `(function(){try{var key="todo-gstack-theme";var t=localStorage.getItem(key)||"system";var sys=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var resolved=(t==="system")?sys:t;var d=document.documentElement;if(resolved==="dark"){d.classList.add("dark")}else{d.classList.remove("dark")}}catch(e){}})();`;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
