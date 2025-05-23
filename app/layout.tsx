import './globals.css';
import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/lib/auth';
import { FaWhatsapp } from 'react-icons/fa'; 

const leagueSpartan = League_Spartan({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Everest Souvenir House - Authentic Nepali Souvenirs & Handicrafts',
  description: 'Discover handcrafted Nepali souvenirs and traditional handicrafts at Everest Souvenir House. Quality products showcasing Nepal\'s rich cultural heritage.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${leagueSpartan.className} bg-[#F8F3D9]`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>

            {/* WhatsApp Floating Icon */}
            <a
              href="https://wa.me/9779851213365" 
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all z-50"
            >
              <FaWhatsapp size={24} />
            </a>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
