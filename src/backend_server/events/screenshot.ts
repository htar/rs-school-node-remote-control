import Jimp from 'jimp';
import { screen, getMousePos } from 'robotjs';
import { parseData } from '../../utils/parseData';
import internal from 'stream';

const screenshot = async function printScreen(
	chunk: string,
	wsStream: internal.Duplex
) {
	const width = 200;
	const height = 200;

	const [command, param] = await parseData(chunk);

	const { x: eventX, y: eventY } = await getMousePos();

	const bitmap = await screen.capture(eventX - 99, eventY - 99, width, height);
	const image = await new Jimp(bitmap.width, bitmap.height);

	let pos = 0;

	image.scanQuiet(
		0,
		0,
		image.bitmap.width,
		image.bitmap.height,
		(eventX, eventY, idx) => {
			image.bitmap.data[idx + 2] = bitmap.image.readUInt8(pos++);
			image.bitmap.data[idx + 1] = bitmap.image.readUInt8(pos++);
			image.bitmap.data[idx + 0] = bitmap.image.readUInt8(pos++);
			image.bitmap.data[idx + 3] = bitmap.image.readUInt8(pos++);
		}
	);
	const base64 = await image.getBase64Async(image.getMIME());
	wsStream.write(`prnt_scrn ${base64.substring(22)}`)
};

export default screenshot;
