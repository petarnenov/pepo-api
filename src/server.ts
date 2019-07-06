import express = require('express');
import path = require('path');
import { v1 } from 'uuid';
import { addUser } from './addUser';
import { getUser } from './getUser';
import { getAllUsers } from './getAllUsers';
import { deleteUser } from './deleteUser';
import { deleteAllUsers } from './deleteAllUsers';
import { User } from './user';
import { format, transports } from 'winston';
import expressWinston = require('express-winston');
import { counter } from './counter';
import { users } from './data';

const app: express.Application = express();
const router = express.Router();

const port = process.env.PEPO_API_PORT || 8888;

app.use(
	expressWinston.logger({
		format: format.json(),
		transports: [
			//
			// - Write to all logs with level `info` and below to `combined.log`
			// - Write all logs error (and below) to `error.log`.
			//
			new transports.File({
				dirname: 'logs',
				filename: 'all.log',
				level: 'silly'
			})
			// new transports.File({
			// 	dirname: 'logs',
			// 	filename: 'combined.log',
			// 	level: 'info'
			// })
		]
	})
);

export const run = () => {
	router.all('*', (req, res, next) => {
		counter.increase();
		console.log(`request : ${counter.getCounter()}`);
		console.table(users);
		next();
	});

	//TODO: handle GET method
	router.get('/', (req, res) => {
		res.status(200);
		res.send({ data: 'Hello from pepo-api ;)' });
	});

	router.get('/main', (req, res) => {
		res.status(200);
		res.sendFile(path.join(__dirname + '/view/index1.html'));
	});

	//TODO: handle POST method

	router.post('/user', (req, res) => {
		console.info(req.body.createdAt);
		const user: User = new User(
			v1(),
			req.body.name,
			req.body.email,
			req.body.phoneNumbers,
			req.body.createdAt
		);
		if (addUser(user)) {
			res.status(200);
			res.send({ data: { uuid: user.uuid } });
		} else {
			res.status(500).send();
		}
	});

	router.get('/user/:id', (req, res, next) => {
		const id = req.params.id;
		if (id) {
			const user = getUser(id);
			if (user) {
				res.status(200);
				res.send({ data: user });
			} else {
				next();
			}
		} else {
			next();
		}
	});

	router.delete('/user', (req, res, next) => {
		const id = req.body.uuid;
		if (id) {
			const isDeletedUser = deleteUser(id);
			if (isDeletedUser) {
				res.status(200);
				res.send({ data: isDeletedUser });
			} else {
				next();
			}
		} else {
			next();
		}
	});

	router.get('/allUsers', (req, res, next) => {
		const allUsers = getAllUsers();
		if (allUsers) {
			res.status(200);
			res.send({ data: allUsers });
		} else {
			next();
		}
	});

	router.delete('/allUsers', (req, res, next) => {
		const isDeletedAllUsers = deleteAllUsers();
		if (isDeletedAllUsers) {
			res.status(200);
			res.send({
				data: users
			});
		} else {
			next();
		}
	});

	router.purge('/', (req, res) => {
		throw Error('error purging some mistakes');
	});

	//TODO: handle all others
	router.get('*', (req, res) => {
		res.status(404).send();
	});

	//Store all HTML files in view folder.
	app.use(express.static(__dirname + '/view'));

	app.use(express.json());

	app.use('/', router);
	app.listen(port, () => {
		console.log(`Server runnig on port: ${port}...`);
	});
};


//Pepo-api
