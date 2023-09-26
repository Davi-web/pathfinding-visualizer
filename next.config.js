/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs',
        has: [
          {
            type: 'query',
            key: 'rsc',
          },
        ],
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/docs/:path*'
            : '/api/docs',
      },
      {
        source: '/redoc',
        has: [
          {
            type: 'query',
            key: 'rsc',
          },
        ],
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/redoc'
            : '/api/redoc',
      },
      {
        source: '/openapi.json',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/openapi.json'
            : '/api/openapi.json',
      },
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/api/:path*'
            : '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
