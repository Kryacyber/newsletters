import { createServer } from "http";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { extname, join } from "path";
import { fileURLToPath } from "url";

const PORT = 7433;
const DB = "./subscribers.json";
const ROOT = "./public";

createServer((req, res) => {
  if (req.method === "GET") {
    let path = req.url === "/" ? join(ROOT, "index.html") : join(ROOT, req.url);
    try {
      const ext = extname(path).toLowerCase();
      const contentType =
        ext === ".html"
          ? "text/html"
          : ext === ".js"
            ? "text/javascript"
            : ext === ".css"
              ? "text/css"
              : ext === ".png"
                ? "image/png"
                : ext === ".jpg" || ext === ".jpeg"
                  ? "image/jpeg"
                  : ext === ".svg"
                    ? "image/svg+xml"
                    : ext === ".ico"
                      ? "image/x-icon"
                      : "application/octet-stream";

      const content = readFileSync(path);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(404);
      res.end("Not Found");
    }
  }
}).listen(PORT, () => console.log(`newsletters at localhost${PORT}`));
