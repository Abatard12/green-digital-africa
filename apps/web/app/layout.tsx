import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./theme/ThemeContext";
import WhatsAppButton from "./components/WhatsAppButton";
import ChatWidget from "./components/ChatWidget";
import ScrollProgress from "./components/ScrollProgress";

const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-worksans" });

export const metadata: Metadata = {
  title: "Green Digital Africa",
  description: "Numérique durable, cybersécurité et inclusion pour l'Afrique.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
     <body className={`${workSans.variable} font-body text-ink antialiased bg-surface dark:bg-ink dark:text-white`}>
          <ThemeProvider>
          <LanguageProvider>
            <ScrollProgress />
            {children}
            <WhatsAppButton />
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>
               
      </body>
    </html>
  );
}
