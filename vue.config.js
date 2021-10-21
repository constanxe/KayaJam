module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "startbootstrap-sb-admin/dist/css/styles";
          @import "bootstrap/dist/css/bootstrap";
          @import "@/assets/_config.scss";
          @import "@/assets/_global.scss";
        `
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "Spotify Webapp";
          return args;
      })
  }
};