import { ToastContainer } from "react-toastify";
import "./globals.css";

interface LayoutProps {
     children: React.ReactNode;
}
export default function RootLayout({ children }: LayoutProps) {
     return (
          <html lang="en" className={"h-full antialiased"}>
               <body className="min-h-full flex flex-col">
                    <ToastContainer position="top-right" autoClose={5000} />

                    {children}
               </body>
          </html>
     );
}
