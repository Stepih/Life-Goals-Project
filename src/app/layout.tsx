import { ReactNode } from 'react';

import '../styles/global.css';

import Header from '@/components/header/Header';

import '@fortawesome/fontawesome-free/css/all.min.css';


export const metadata = {
  title: 'Пэт-проект задачник',
  description: 'Это мой пэт проект, написанный на Next JS.',
};

export default async function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="ru">
      <body className='bg-gray-50 min-h-screen' style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
          <Header />
          <main className='relative min-h-[calc(100%-108px)] max-w-6xl mx-auto px-0 sm:p-4'>
            {children}
          </main>
      </body>
    </html>
  );
}
