import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TutorialModal from '@/components/tutorial-modal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visualizo',
  description: 'Pathfinding Visualizer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TutorialModal />
        {children}
      </body>
    </html>
  );
}
