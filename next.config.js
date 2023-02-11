const { query } = require("express");

/**
 * @type {import('next').NextConfig}
 *  */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      //pages
      {
        source: "/storage",
        destination: "/storage/내_드라이브",
      },
      {
        source: "/login/authorize",
        destination: `http://api.ikiningyou.com/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://www.ikiningyou.com/`,
      },
      {
        source: "/login/authorize",

        destination: `http://api.ikiningyou.com/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://www.ikiningyou.com/`,
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
        destination: "http://api.ikiningyou.com/authorizationview/",
      },
      {
        source: "/test/boardlist",
        destination: "http://api.ikiningyou.com/boardlist/",
      },
      {
        source: "/test/getStorageSize",
        destination: "http://api.ikiningyou.com/users/getstoragesize/",
      },
      {
        source: "/test/getfolders",
        destination: "http://api.ikiningyou.com/getfolders/",
      },
      {
        source: "/test/uploadfiles",
        destination: "http://api.ikiningyou.com/users/uploadfiles/",
      },
      {
        source: "/test/downloadfiles",
        destination: "http://api.ikiningyou.com/users/downloadfiles/",
      },
      {
        source: "/test/deletefiles",
        destination: "http://api.ikiningyou.com/users/deletefiles/",
      },
      {
        source: "/test/register",
        destination: "http://api.ikiningyou.com/register/",
      },
      {
        source: "/test/login",
        destination: "http://api.ikiningyou.com/login/",
      },
      {
        source: "/test/submitlogin",
        destination: "http://api.ikiningyou.com/submitlogin/",
      },
      {
        source: "/test/getuser",
        destination: "http://api.ikiningyou.com/getuser/",
      },
      {
        source: "/test/auth",
        destination: "http://api.ikiningyou.com/users/o/authorize/",
      },
      {
        source: "/test/token",
        destination: "http://api.ikiningyou.com/users/o/token/",
      },
      {
        source: "/test/logout",
        destination: "http://api.ikiningyou.com/logout/",
      },

      {
        source: "/test/refresh",
        destination: "http://api.ikiningyou.com/refreshtoken/",
      },
      {
        source: "/test/validtoken",
        destination: "http://api.ikiningyou.com/users/validtoken/",
      },
      {
        source: "/test/getfilelistbypath/:path*",
        destination: "http://api.ikiningyou.com/users/getfilelistbypath/:path*",
      },
      {
        source: "/test/addFolder/:path*",
        destination: "http://api.ikiningyou.com/users/addfolder/",
      },
    ];
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
