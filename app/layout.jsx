"use client"
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TanstackProvider from "@/providers/TanstackProvider";
import { Provider } from "react-redux";

import store, { persistor } from './store/store'
import { PersistGate } from "redux-persist/integration/react";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <Provider store={store}>
        {/* PersistGate ensures data persistence before rendering */}
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <TanstackProvider>
            <div className="h-[80px]">
              <Navbar />
            </div>
            <div className="">{children}</div>
          </TanstackProvider>
        </PersistGate>
      </Provider>
    </body>
  </html>
  );
}
