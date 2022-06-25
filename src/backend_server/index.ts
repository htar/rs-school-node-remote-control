import WebSocket, { WebSocketServer } from 'ws';
import Jimp from 'jimp';
import robot from 'robotjs';
const WSS_PORT: number = Number(process.env.WSS_PORT) || 8080;

export const wsServer = () => {
	const wss = new WebSocketServer({ port: WSS_PORT });

	wss.on('connection', (ws: WebSocket) => {
		console.log('WS Client connected');
		ws.on('message', (message: string) => {
			console.log('received: %s', message);
		});
		ws.send('something');

		ws.on('error', (error) => {
			console.log('Some Error occurred', error);
		});
	});

	wss.on('close', (): void => {
		console.log('WS Client disconnected');
	});
};
