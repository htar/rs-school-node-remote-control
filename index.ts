import { clientServer } from './src/http_client_server/index';
import { wsServer } from './src/backend_server/index';

import dotenv from 'dotenv';
dotenv.config();

clientServer();

wsServer();
