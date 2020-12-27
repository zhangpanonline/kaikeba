const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true)
    if (pathname === '/') {
        fs.readFile('./form.html', (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end('404 NOT FOUND')
            } else {
                res.end(data)
            }
        })
    } else {
        res.end(JSON.stringify(query))
    }
}).listen(8888)