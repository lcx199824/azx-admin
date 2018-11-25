const PORT = 3000

const http = require('http')
const url = require('url')
const httpProxy = require('http-proxy')

const serverProxy = httpProxy.createProxyServer({
  target: 'https://wx.skywen.cn', // 接口地址
  changeOrigin: true
})
const frontendProxy = httpProxy.createProxyServer({
  target: 'http://localhost:8080', // 接口地址
  changeOrigin: true
})

const server = http.createServer(function (request, response) {
  const pathname = url.parse(request.url).pathname
  if (pathname.indexOf('api') >= 0) {
    request.url = request.url.replace('/api', '')
    serverProxy.web(request, response)
    // console.log(request.url);
    // 判断如果是接口访问，则通过proxy转发
  } else {
    frontendProxy.web(request, response)
  }
})
server.listen(PORT)
console.log('Server runing at port: ' + PORT + '.')
