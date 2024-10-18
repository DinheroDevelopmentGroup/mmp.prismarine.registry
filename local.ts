import loader from 'prismarine-registry';

import { createChannel } from '../../worker/parent.js';
import { type GlobalMessage, type LocalMessage } from './shared.js';

export const channel = createChannel<LocalMessage, GlobalMessage>('registry');

export const { version, protocolVersion } = await new Promise<GlobalMessage>(
  (resolve) => {
    channel.subscribe((message) => {
      resolve(message);
    });

    // undefined is written to signify that the worker is ready
    channel.write(undefined);
  },
);

export const registry = loader(version);

export default registry;
