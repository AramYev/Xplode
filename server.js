import http from 'http';
import app from './src/api/app.js';
import { init } from './src/index.js';

const port = process.env.PORT || 3000;

await init();

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server listen on localhost:3000');
});
