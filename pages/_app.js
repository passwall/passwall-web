import React from 'react'
import Head from 'next/head'
import SiteConfig from '../site.config'
import { StoreProvider } from '../store'
import { MobileNav } from '../components/nav'

import 'react-toastify/dist/ReactToastify.min.css'
import '../styles/app.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* base */}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={SiteConfig.description} />

        {/* facebook */}
        <meta property="og:url" content={SiteConfig.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SiteConfig.title} />
        <meta property="og:description" content={SiteConfig.description} />

        {/* twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={SiteConfig.siteUrl} />
        <meta name="twitter:title" content={SiteConfig.title} />
        <meta name="twitter:description" content={SiteConfig.description} />

        {/* pwa */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
        <meta name="application-name" content={SiteConfig.title} />
        <meta name="apple-mobile-web-app-title" content={SiteConfig.title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Head>
      <StoreProvider>
        <MobileNav />
        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}
