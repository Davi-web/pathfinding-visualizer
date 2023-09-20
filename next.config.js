/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.01:8000/api/:path*'
              : '/api/',
        },
      ],
      afterFiles: [
        {
          source: '/docs',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.01:8000/docs'
              : process.env.VERCEL_URL + 'docs',
        },

        {
          source: '/openapi.json',
          destination:
            process.env.NODE_ENV === 'development'
              ? 'http://127.0.01:8000/openapi.json'
              : process.env.VERCEL_URL + '/openapi.json',
        },
      ],

      // {
      //   source: '/docs',
      //   destination:
      //     process.env.NODE_ENV === 'development'
      //       ? 'http://127.0.0.1:8000/docs'
      //       : '/api/docs',
      // },
      // {
      //   source: '/openapi.json',
      //   destination:
      //     process.env.NODE_ENV === 'development'
      //       ? 'http://127.0.0.1:8000/openapi.json'
      //       : '/api/openapi.json',
      // },
      // {
      //   source: '/api/:path*',
      //   destination:
      //     process.env.NODE_ENV === 'development'
      //       ? 'http://127.0.0.1:8000/api/:path*'
      //       : '/api/',
      // },
    };
  },
};

module.exports = nextConfig;
