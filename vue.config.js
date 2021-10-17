module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "bootstrap/dist/css/bootstrap";
          @import "@/assets/_config.scss";
          @import "@/assets/_global.scss";
        `
      }
    }
  }
};