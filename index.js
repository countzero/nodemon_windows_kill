//
// A HTTP server that gracefully shuts itself down on a SIGINT POSIX signal.
//
// This is a test for a nodemon bugfix that enables SIGINT on Windows.
//
// See https://github.com/remy/nodemon/issues/1720 for more details.
//

// We are gracefully terminating the node process on SIGINT.
process.on('SIGINT', async signal => {

    const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

    console.info(`The node process (${process.pid}) received a ${signal} POSIX signal, starting graceful shutdown...`);

    // This simulates the time a system needs to prepare for shutdown. i.e. close connections, file handlers etc.
    await sleep(1000);

    console.info('Terminating process with exit code 0...');
    process.exit(0);
});

// We are implementing a simple HTTP server that responds with the current time.
require('http').createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write((new Date()).toString());
    response.end();
}).listen(8080);

console.info('The server started listening on http://localhost:8080');
