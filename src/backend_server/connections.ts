import WebSocket, { createWebSocketStream } from 'ws';
import { parseData } from '../utils/parseData';
import { mouseMove } from './mouseMove';

export const connections = (ws: WebSocket) => {
	const wsStream = createWebSocketStream(ws, {
		encoding: 'utf8',
		decodeStrings: false,
	});

	wsStream.on('data', async (chunk: string) => {
		const [command, param1] = await parseData(chunk);

		if (chunk.includes('mouse_')) {
			return mouseMove(command, param1, wsStream);
		}
	});

	ws.on('close', () => {
		wsStream.destroy();
		process.exit();
	});
};
