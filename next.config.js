/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/docs'
            : '/api/docs',
      },
      {
        source: '/docs',
        has: [
          {
            type: 'query',
            key: '_rsc',
            value: '1ag7k',
          },
        ],
        destination: '/api/docs',
      },
      {
        source: '/redoc',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/redoc'
            : '/api/redoc',
      },
      {
        source: '/redoc',
        has: [
          {
            type: 'query',
            key: '_rsc',
            value: '1ag7k',
          },
        ],
        destination: '/api/redoc',
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
            : '/api/',
      },
    ];
  },
};

module.exports = nextConfig;
