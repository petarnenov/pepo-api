import { Server } from './server';
import cluster = require('cluster');

const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
	console.info(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker: cluster.Worker, code, signal) => {
		console.warn(`worker ${worker.process.pid} died`);
	});
} else {
	// Workers can share any TCP connection
	// In this case it is an HTTP server
	//TODO: check cluster module ti use properly!!!
	new Server(process.pid).run();

	console.log(`Worker ${process.pid} started`);
}
