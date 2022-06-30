import robot from 'robotjs';
import internal from 'stream';

export const mouseMove = (
	command: string,
	param: string,
	wsStream: internal.Duplex
) => {
	const { x: eventX, y: eventY } = robot.getMousePos();
	switch (command) {
		case 'mouse_up':
			robot.moveMouse(eventX, eventY - +param);
			return wsStream.write(command);

		case 'mouse_down':
			robot.moveMouse(eventX, eventY + +param);
			return wsStream.write(command);

		case 'mouse_right':
			robot.moveMouse(eventX + +param, eventY);
			return wsStream.write(command);

		case 'mouse_left':
			robot.moveMouse(eventX - +param, eventY);
			return wsStream.write(command);

		case 'mouse_position':
			return wsStream.write(`mouse_position ${eventX},${eventY}`);

		default:
			return;
	}
};
