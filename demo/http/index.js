const http = require('http');
const port = 1024;

const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log('req, res', req, res)
    fs.readFile('./index.html', (error, file) => {
        console.log('req', req)
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(file),
            'Content-Type': 'text/html'
        });
        res.end(file);
    })

})

server.on('connect', (req, cltSocket, head) => {
    console.log(req, cltSocket, head);
})

server.listen(port);