const { query } = require("express");

/**
 * @type {import('next').NextConfig}
 *  */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      //pages
      {
        source: "/login/authorize",
        destination: `http://127.0.0.1:8000/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://127.0.0.1:3000/`,
      },
      {
        source: "/login/authorize",

        destination: `http://127.0.0.1:8000/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://127.0.0.1:3000/`,
      },
      {
        source: "/kanata",
        destination: `/main`,
      },
      {
        source: "/login/:path*",
        destination: "/login",
      },
      //APIs
      {
        source: "/test/authorizationview",
        destination: "http://127.0.0.1:8000/authorizationview/",
      },
      {
        source: "/test/boardlist",
        destination: "http://127.0.0.1:8000/boardlist/",
      },
      {
        source: "/test/getStorageSize",
        destination: "http://127.0.0.1:8000/users/getstoragesize/",
      },
      {
        source: "/test/getfolders",
        destination: "http://127.0.0.1:8000/getfolders/",
      },
      {
        source: "/test/uploadfiles",
        destination: "http://127.0.0.1:8000/users/uploadfiles/",
      },
      {
        source: "/test/register",
        destination: "http://127.0.0.1:8000/register/",
      },
      {
        source: "/test/login",
        destination: "http://127.0.0.1:8000/login/",
      },
      {
        source: "/test/submitlogin",
        destination: "http://127.0.0.1:8000/submitlogin/",
      },
      {
        source: "/test/getuser",
        destination: "http://127.0.0.1:8000/getuser/",
      },
      {
        source: "/test/auth",
        destination: "http://127.0.0.1:8000/users/o/authorize/",
      },
      {
        source: "/test/token",
        destination: "http://127.0.0.1:8000/users/o/token/",
      },
      {
        source: "/test/logout",
        destination: "http://127.0.0.1:8000/logout/",
      },

      {
        source: "/test/refresh",
        destination: "http://127.0.0.1:8000/users/refreshtoken/",
      },
      {
        source: "/test/validtoken",
        destination: "http://127.0.0.1:8000/users/validtoken/",
      },
      {
        source: "/test/getfilelistbypath/:path*",
        destination: "http://127.0.0.1:8000/users/getfilelistbypath/:path*",
      },
    ];
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
