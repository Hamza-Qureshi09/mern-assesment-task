import './globals.css'
import type { Metadata } from 'next'
import { ReduxProvider } from '@/store/ToolProvider/index'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Mern Assesment',
  description: 'Created By HQ.',
  icons: '/images/hq.jpg'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='w-full m-0 p-0 bg-zinc-50'>
        <ReduxProvider>
          <main className='w-full flex flex-col'>
            {children}
            <Toaster />
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
