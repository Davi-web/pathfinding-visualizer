/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/docs/:path*', // /docs?rsc=1
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/docs/:path*'
            : '/api/docs/:path*',
      },
      {
        source: '/redoc/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/redoc/:path*'
            : '/api/redoc/:path*',
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
