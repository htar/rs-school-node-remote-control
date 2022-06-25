import dotenv from 'dotenv';
import Jimp from 'jimp';
import { httpServer } from './src/http_server/index';
import robot from 'robotjs';
import WebSocket, { WebSocketServer } from 'ws';

dotenv.config();

const HTTP_PORT: number = Number(process.env.FRONT_PORT) || 3000;
const WSS_PORT: number = Number(process.env.WSS_PORT) || 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WSS_PORT });

wss.on('connection', (ws: WebSocket) => {
	console.log('WS Client connected');
	ws.on('message', (message: string) => {
		console.log('received: %s', message);
	});
	ws.send('something');
});

wss.on('close', (): void => {
	console.log('WS Client disconnected');
});
