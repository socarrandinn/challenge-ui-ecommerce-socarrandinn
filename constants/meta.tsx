import { Metadata } from "next";

export const commonMeta: Metadata = {
  title: process.env.NEXT_PUBLIC_STORE_NAME_SEO || 'Ecommerce app',
  description: process.env.NEXT_PUBLIC_STORE_DESCRIPTION_SEO || 'Ecommerce app',
  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};