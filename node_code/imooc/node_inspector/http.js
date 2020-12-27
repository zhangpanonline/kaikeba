const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    console.log(req.url)
    fs.readFile(`./${req.url}`, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.write('404')
            res.end()
        } else {
            res.end(data)
        }
    })
}).listen(8080)