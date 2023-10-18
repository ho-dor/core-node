const http = require('http')
const fs = require('fs/promises')

const onlyfs = require('fs')

const PORT = 8000;

const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    const buffer = await fs.readFile(__dirname + '/text.txt')

    response.end(buffer.toString());
})

// streams
server.on('request', (req, res) => {
    // to read a file
    // Solution 1

    // onlyfs.readFile(__dirname + '/text.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data)
    // })
    // Problems -> no response sent until the entire file is read.

    // -----------------

    // Solution 2
    // let readableStream = onlyfs.createReadStream(__dirname + '/text.txt');
    // readableStream.on('data', chunk =>{
    //     res.write(chunk);
    // });
    // readableStream.on('end', () => {
    //     res.end();
    // })
    // readableStream.on('error', err => {
    //     res.statusCode = 500;
    //     console.log('failed', err)
    //     res.end('Something went wrong !!!!');
    // })
    // Problem -> Back pressure, if writing speed is lower than reading.

    // -----------------------

    // Solution 3
    let readable = onlyfs.createReadStream('text.txt');
    readable.pipe(res);
})

server.listen(PORT, () => console.log(`Server started on ${PORT}`));