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
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:8000/docs'
              : '/api/docs',
        },
        {
          source: '/docs/:path*',
          // destination: '/api/docs',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.0.1:8000/docs/:path*'
              : '/api/docs/:path*',
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
          source: '/redoc/:path*',
          // destination: '/api/redoc',
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
      ],
    };
  },
};

module.exports = nextConfig;
