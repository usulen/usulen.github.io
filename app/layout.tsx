import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Türk Müziği | Usûl ve Solfej Eğitimi',
  description: 'Türk müziği usûllerini öğrenmek, öğretmek ve pratik yapmak için interaktif solfej eğitim sitesi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
