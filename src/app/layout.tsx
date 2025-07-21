import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: {
    default: 'Supreme Group - Soft Trims and NVH Solutions',
    template: '%s | Supreme Group'
  },
  description: 'Leading provider of soft trims and NVH solutions for seamless rides. Performance in motion with 360-degree nonwoven solutions.',
  keywords: [
    'Supreme Group',
    'soft trims',
    'NVH solutions',
    'automotive',
    'nonwoven solutions',
    'performance',
    'seamless rides',
    'automotive interiors',
    'sound dampening',
    'vibration control'
  ],
  authors: [{ name: 'Supreme Group' }],
  creator: 'Supreme Group',
  publisher: 'Supreme Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://supremegroup.co.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://supremegroup.co.in',
    title: 'Supreme Group - Soft Trims and NVH Solutions',
    description: 'Leading provider of soft trims and NVH solutions for seamless rides. Performance in motion with 360-degree nonwoven solutions.',
    siteName: 'Supreme Group',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Supreme Group - Automotive Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Supreme Group - Soft Trims and NVH Solutions',
    description: 'Leading provider of soft trims and NVH solutions for seamless rides.',
    images: ['/og-image.jpg'],
    creator: '@supremegroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0EA5E9" />
        <meta name="msapplication-TileColor" content="#0EA5E9" />
        
        {/* Prevent automatic phone number detection */}
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Supreme Group",
              "url": "https://supremegroup.co.in",
              "logo": "https://supremegroup.co.in/logo.png",
              "description": "Leading provider of soft trims and NVH solutions for seamless rides",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "110, 11th Road, Chembur",
                "addressLocality": "Mumbai",
                "postalCode": "400071",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-22-25208622",
                "contactType": "customer service",
                "email": "info@supremegroup.co.in"
              },
              "sameAs": [
                "https://twitter.com/supremegroup",
                "https://linkedin.com/company/supreme-group",
                "https://instagram.com/supremegroup",
                "https://youtube.com/supremegroup"
              ]
            })
          }}
        />
      </head>
      <body 
        className={`${inter.className} antialiased bg-white text-gray-900 overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        {/* Main content wrapper */}
        <div className="min-h-screen flex flex-col">
          <main id="main-content" className="flex-grow">
            {children}
          </main>
        </div>

        {/* Performance and analytics scripts */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}