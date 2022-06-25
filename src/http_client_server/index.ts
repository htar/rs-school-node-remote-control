import { readFile } from 'fs';
import { createServer } from 'http';
import { dirname, resolve } from 'path';

const HTTP_PORT: number = Number(process.env.FRONT_PORT) || 3000;

export const clientServer = () => {
	console.log(`Start static http server on the ${HTTP_PORT} port!`);
	createServer(function (req, res) {
		const __dirname = resolve(dirname(''));
		const file_path =
			__dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
		readFile(file_path, function (err, data) {
			if (err) {
				res.writeHead(404);
				res.end(JSON.stringify(err));
				return;
			}
			res.writeHead(200);
			res.end(data);
		});
	}).listen(HTTP_PORT);
};
