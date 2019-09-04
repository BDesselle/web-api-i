const server = require("./server");
const port = 6000;

server.listen(port, () => console.log(`API on port ${port}...`));
