import WebSocket, { WebSocketServer } from 'ws';
import Jimp from 'jimp';
import { connections } from './connections';
const WSS_PORT: number = Number(process.env.WSS_PORT) || 8080;

export const wsServer = () => {
	const wss = new WebSocketServer({ port: WSS_PORT });

	wss.on('connection', (ws: WebSocket) => {
		console.log('WS Client connected');
		ws.on('message', (message: string) => {
			connections(ws);
		});
		ws.send('something');

		ws.on('error', (error) => {
			console.log('connection Error', error);
		});
	});

	wss.on('close', (): void => {
		console.log('WS Client disconnected');
	});
};
