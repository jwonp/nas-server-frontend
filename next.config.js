const { query } = require("express");

/**
 * @type {import('next').NextConfig}
 *  */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  api: {
    // disables call to body parsing module while deployed
    bodyParser: process.env.NODE_ENV !== "production",
  },
  async rewrites() {
    return [
      //pages
      {
        source: "/storage",
        destination: "/storage/내_드라이브",
      },
      // {
      //   source: "/login/authorize",
      //   destination: `https://api.ikiningyou.com/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://www.ikiningyou.com/`,
      // },
      // {
      //   source: "/login/authorize",

      //   destination: `https://api.ikiningyou.com/users/o/authorize/?response_type=code&code_challenge=${process.env.NEXT_PUBLIC_CODE_CHALLENGE}&code_challenge_method=S256&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=http://www.ikiningyou.com/`,
      // },
      {
        source: "/kanata",
        destination: `/main`,
      },
      {
        source: "/login/:path*",
        destination: "/login",
      },
      //APIs
      // {
      //   source: "/test/authorizationview",
      //   destination: "https://api.ikiningyou.com/authorizationview/",
      // },
      // {
      //   source: "/test/boardlist",
      //   destination: "https://api.ikiningyou.com/boardlist/",
      // },
      // {
      //   source: "/test/getStorageSize",
      //   destination: "https://api.ikiningyou.com/users/getstoragesize/",
      // },
      // {
      //   source: "/test/getfolders",
      //   destination: "https://api.ikiningyou.com/getfolders/",
      // },
      // {
      //   source: "/test/uploadfiles",
      //   destination: "https://api.ikiningyou.com/users/uploadfiles/",
      // },
      // {
      //   source: "/test/downloadfiles",
      //   destination: "https://api.ikiningyou.com/users/downloadfiles/",
      // },
      // {
      //   source: "/test/deletefiles",
      //   destination: "https://api.ikiningyou.com/users/deletefiles/",
      // },
      // {
      //   source: "/test/register",
      //   destination: "https://api.ikiningyou.com/register/",
      // },
      // {
      //   source: "/test/login",
      //   destination: "https://api.ikiningyou.com/login/",
      // },
      // {
      //   source: "/test/submitlogin",
      //   destination: "https://api.ikiningyou.com/submitlogin/",
      // },
      // {
      //   source: "/test/getuser",
      //   destination: "https://api.ikiningyou.com/getuser/",
      // },
      // {
      //   source: "/test/auth",
      //   destination: "https://api.ikiningyou.com/users/o/authorize/",
      // },
      // {
      //   source: "/test/token",
      //   destination: "https://api.ikiningyou.com/users/o/token/",
      // },
      // {
      //   source: "/test/logout",
      //   destination: "https://api.ikiningyou.com/logout/",
      // },

      // {
      //   source: "/test/refresh",
      //   destination: "https://api.ikiningyou.com/refreshtoken/",
      // },
      // {
      //   source: "/test/validtoken",
      //   destination: "https://api.ikiningyou.com/users/validtoken/",
      // },
      // {
      //   source: "/test/getfilelistbypath/:path*",
      //   destination:
      //     "https://api.ikiningyou.com/users/getfilelistbypath/:path*",
      // },
      // {
      //   source: "/test/addFolder/:path*",
      //   destination: "https://api.ikiningyou.com/users/addfolder/",
      // },
    ];
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
