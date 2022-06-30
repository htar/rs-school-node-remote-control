import { moveMouse, getMousePos } from 'robotjs';
import internal from 'stream';
import { parseData } from '../../utils/parseData';

const mouseEvent = (chunk: string, wsStream: internal.Duplex) => {
	const [command, param] = parseData(chunk);

	const { x: eventX, y: eventY } = getMousePos();

	switch (command) {
		case 'mouse_up':
			moveMouse(eventX, eventY - +param);
			break;

		case 'mouse_down':
			moveMouse(eventX, eventY + +param);
			break;

		case 'mouse_right':
			moveMouse(eventX + +param, eventY);
			break;

		case 'mouse_left':
			moveMouse(eventX - +param, eventY);
			break;

		case 'mouse_position':
			wsStream.write(`mouse_position ${eventX},${eventY}`);
			break;

		default:
			return;
	}
};

export default mouseEvent;
