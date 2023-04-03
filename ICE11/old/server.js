"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const hostname = '0.0.0.0';
const port = process.env.PORT ? parseInt(process.env.PORT) : 3010;
let lookup = mime_types_1.default.lookup;
const server = http_1.default.createServer((req, res) => {
    let path = req.url;
    if (path == "/" || path == "/home") {
        path = "/index.html";
    }
    let mimeType = mime_types_1.default.lookup(path.substring(1));
    fs_1.default.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write("<h1>Page Not Found</h1>");
            res.end();
        }
        else {
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
        }
    });
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=server.js.map