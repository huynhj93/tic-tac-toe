const http = require('http');
const app = require('./config/express');

const port = 8911;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, (server) => {
  console.log(`Server started on port ${port}`);
});
