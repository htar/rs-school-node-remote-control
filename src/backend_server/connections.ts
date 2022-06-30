import WebSocket, { createWebSocketStream } from 'ws';
import mouseEvent from './events/mouseEvent';
import drawEvent from './events/drawEvent';
import screenshot from './events/screenshot';

export const connections = (ws: WebSocket) => {
	const wsStream = createWebSocketStream(ws, {
		encoding: 'utf8',
		decodeStrings: false,
	});

	wsStream.on('data', async (chunk: string) => {
		if (chunk.includes('mouse_')) {
			console.log('mouseEvent', chunk);
			return mouseEvent(chunk, wsStream);
		}
		if (chunk.includes('draw_')) {
			console.log('drawEvent', chunk);

			return drawEvent(chunk, wsStream);
		}
		if (chunk.includes('rnt_scrn')) {
			console.log('screenshot', chunk);
			return screenshot(chunk, wsStream);
		}
	});

	ws.on('close', () => {
		wsStream.destroy();
		process.exit();
	});
};
