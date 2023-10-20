import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sunil Band Resume',
  description: 'Sunil Band is a software engineer based in India. He is a full stack developer with experience in React, Node, and TypeScript ,Next.js and MongoDB. If you are looking for a software engineer, you can get in touch with him here.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
        </body>
    </html>
  )
}
