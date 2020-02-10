const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/createusers") {
    res.write("<html>");
    res.write("<head><title>Some sort of message</title></head>");
    res.write("<body>");
    res.write('<form action="/users" method="POST">');
    res.write('<input type="text" name="users">');
    res.write('<button type="submit">Send</button>');
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/users" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const users = parsedBody.split("=")[1];
      fs.writeFile("users.txt", users, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My Second Page</title></head>");
  res.write("<body><ul><li>dummy</li><li>more dummy<li></ul></body>");
  res.write("</html>");
});

server.listen(3000);
