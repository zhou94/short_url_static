const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/shortUrl', { 
       target: 'http://localhost:3001',
       secure: false,
       changeOrigin: true
    }));
};