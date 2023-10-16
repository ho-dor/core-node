const http = require('http')
const fs = require('fs/promises')

const PORT = 8000;

const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    const buffer = await fs.readFile(__dirname + '/text.txt')

    response.end(buffer.toString());
})

server.listen(PORT, () => console.log(`Server started on ${PORT}`));