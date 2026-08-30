import { ToastContainer } from "react-toastify";
import "./globals.css";
import AppProviders from "@/providers/appProviders";

interface LayoutProps {
     children: React.ReactNode;
}
export default function RootLayout({ children }: LayoutProps) {
     return (
          <html lang="en" className={"h-full antialiased"}>
               <body className="min-h-full flex flex-col">
                    <AppProviders>
                         <ToastContainer
                              position="top-right"
                              autoClose={5000}
                         />

                         {children}
                    </AppProviders>
               </body>
          </html>
     );
}
