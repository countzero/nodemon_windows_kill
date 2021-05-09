//
// A HTTP server that gracefully shuts itself down on a SIGINT POSIX signal.
//
// This is a test for a nodemon bugfix that enables SIGINT on Windows.
//
// See https://github.com/remy/nodemon/issues/1720 for more details.
//

let isShuttingDown = false;

// We are gracefully terminating the node process on the first SIGINT.
process.on('SIGINT', async signal => {

    const signalInformation = `The node process (${process.pid}) received a ${signal} POSIX signal`;

    if (isShuttingDown) {
        console.info(`${signalInformation} - already shutting down, ignoring...`);
        return;
    }

    isShuttingDown = true;

    const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

    console.info(`${signalInformation} - initiating shutdown...`);

    // This simulates the time a system needs to prepare for shutdown.
    await sleep(1000);

    console.info('Terminating process with exit code 0...');
    process.exit(0);
});

const server = require('http')

    // We are implementing a simple HTTP server that responds with the current time.
    .createServer((request, response) => {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write((new Date()).toString());
        response.end();
    })

    // We are binding to any free port on the host to avoid EADDRINUSE errors.
    .listen();

console.info(`The server started listening on http://localhost:${server.address().port}`);
