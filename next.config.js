/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Redirect non-www to www (301 permanent redirect)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'gtcfx.com',
          },
        ],
        destination: 'https://www.gtcfx.com/:path*',
        permanent: true,
      },
      {
        source: '/live-account',
        destination: 'https://mygtcfx.com',
        permanent: true,
      },
       {
        source: '/dynamic-margin',
        destination: 'https://www.gtcfx.com/dynamic-leverage',
        permanent: true,
      },
      {
        source: '/latest-news',
        destination: '/blogs',
        permanent: true,
      },
       {
        source: '/faq',
        destination: '/glossary-faqs',
        permanent: true,
      },
      {
        source: '/live-account',
        has: [
          {
            type: 'host',
            value: 'www.gtcfx.com', 
          },
        ],
        destination: 'https://mygtcfx.com',
        permanent: true,
      },
      { source: '/terms-and-conditions', has: [ { type: 'host', value: 'www.gtcfx.com', }, ], destination: 'https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/Website+Client+Document/GTC+Global+Trade+Capital+Co.+Ltd+(VANUATU)/T%26S+-+GTC+GLOBAL+TRADE+CAPITAL+CO.+LTD.pdf', permanent: true, },
      {
        source: '/:locale([A-Za-z-]{2,5})/terms-and-conditions',
        has: [ 
          {
            type: 'host',
            value: 'www.gtcfx.com',
          },
        ],
        destination:
          'https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/Website+Client+Document/GTC+Global+Trade+Capital+Co.+Ltd+(VANUATU)/T%26S+-+GTC+GLOBAL+TRADE+CAPITAL+CO.+LTD.pdf',
        permanent: true,
      },

      // ✅ NEW REDIRECT: forex-trading → forex
      {
        source: '/forex-trading',
        destination: '/forex',
        permanent: true,
      }
    ];
  },

  transpilePackages: ['@gtcfx-frontend/gtcfx-frontend'],

  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    config.resolve.alias.canvas = false;
    return config;
  },

  images: {
    domains: [
      'gtcfx-bucket.s3.ap-southeast-1.amazonaws.com',
      'api.gtcfx.com',
      'www.mitradeforex.com',
      'resource.mistorebox.com',
      'images.unsplash.com'
    ],   
  },
};

module.exports = nextConfig; 
