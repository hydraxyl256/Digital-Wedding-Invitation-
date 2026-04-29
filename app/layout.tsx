import type { Metadata } from "next";
import "./globals.css";
import { WeddingProvider } from "@/components/providers/WeddingContext";
import MusicPlayer from "@/components/ui/MusicPlayer";
import NavigationDots from "@/components/ui/NavigationDots";
import { weddingConfig } from "@/lib/wedding-config";

export const metadata: Metadata = {
  title: `${weddingConfig.coupleNames} — Wedding Invitation`,
  description: `Join us for the wedding celebration of ${weddingConfig.coupleNames} on ${weddingConfig.weddingDateFormatted} in Nairobi, Kenya.`,
  openGraph: {
    title: `${weddingConfig.coupleNames} — Wedding Invitation`,
    description: `You are cordially invited to our wedding on ${weddingConfig.weddingDateFormatted}.`,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#FDF6EC" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <WeddingProvider>
          {children}
          <MusicPlayer />
          <NavigationDots />
        </WeddingProvider>
      </body>
    </html>
  );
}
