import internal from 'stream';
import { parseData } from '../../utils/parseData';
import mouseEvent from './mouseEvent';
import {
	dragMouse,
	moveMouseSmooth,
	mouseToggle,
	setMouseDelay,
	moveMouse,
	getMousePos,
} from 'robotjs';

const circle = (radius: number, eventX: number, eventY: number) => {
	mouseToggle('down');

	for (let i = 0; i <= Math.PI * 2; i += 0.01) {
		const x = eventX + radius * Math.cos(i);
		const y = eventY + radius * Math.sin(i);

		dragMouse(x, y);
		if (i === 0) mouseToggle('down');
	}
};

const drawRectangle = (
	width: number,
	length: number,
	eventX: number,
	eventY: number
) => {
	setMouseDelay(80);
	moveMouse(eventX + width, eventY);
	moveMouse(eventX + width, eventY + length);
	moveMouse(eventX, eventY + length);
	moveMouse(eventX, eventY);
	mouseToggle('down');
};

const square = (width: number, eventX: number, eventY: number) => {
	setMouseDelay(80);

	moveMouse(eventX + width, eventY);
	moveMouse(eventX + width, eventY + width);
	moveMouse(eventX, eventY + width);
	moveMouse(eventX, eventY);
	mouseToggle('down');
};

const drawEvent = (chunk: string, wsStream: internal.Duplex) => {
	const [command, param1, param2] = parseData(chunk);
	const { x: eventX, y: eventY } = getMousePos();
	switch (true) {
		case chunk.includes('draw_circle'):
			const radius = param1;
			circle(+radius, eventX, eventY);

			break;
		case chunk.includes('draw_square'):
			square(+param1, eventX, eventY);

			break;
		case chunk.includes('draw_rectangle'):
			const widthValue = param1;
			const length = param2;
			drawRectangle(+widthValue, +length, eventX, eventY);

			break;
		default:
			break;
	}
};

export default drawEvent;
