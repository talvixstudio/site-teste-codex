import type { Metadata } from 'next';
import './globals.css';
import './refinements.css';
export const metadata: Metadata = {
  title: 'Sorria — Odontologia com propósito',
  description:
    'Um olhar humano para o seu sorriso. Saúde, estética e bem-estar em um só lugar. Site demonstrativo.',
  icons: { icon: '/favicon.svg' },
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
