/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:8000/api/:path*'
              : '/api/',
        },
      ],
      afterFiles: [
        {
          source: '/docs',
          // destination: '/api/docs',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:8000/docs'
              : '/api/docs',
        },
        {
          source: '/redoc',
          // destination: '/api/redoc',
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
      ],
      fallback: [
        {
          source: '/docs',
          // destination: '/api/docs',
          has: [
            {
              type: 'query',
              key: 'rsc',
              value: '1ag7k',
            },
          ],
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:8000/docs'
              : '/api/docs',
        },
        {
          source: '/redoc',
          // destination: '/api/redoc',
          has: [
            {
              type: 'query',
              key: 'rsc',
              value: '1ag7k',
            },
          ],
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:8000/redoc'
              : '/api/redoc',
        },
      ],
    };
  },
};

module.exports = nextConfig;
