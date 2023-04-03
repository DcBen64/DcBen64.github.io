import http from 'http';
import fs from 'fs';
import mime from 'mime-types';

const hostname = '0.0.0.0';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;
let lookup = mime.lookup;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  let path = req.url as string;

  if (path == "/" || path == "/home") {
    path = "/index.html";
  }

  let mimeType = mime.lookup(path.substring(1)) as string;

  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write("<h1>Page Not Found</h1>");
      res.end();
    } else {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
