import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "./providers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/reduxProvider';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mega Market',
  description: 'An Ecommerce platform',
}
import ProtectRoutes from '@/components/auth/protectRoutes/page'
export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            <ProtectRoutes>
              <ToastContainer
                position="top-right"
                autoClose={800}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="light"
                />
                  {children}
            </ProtectRoutes>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  )
}
