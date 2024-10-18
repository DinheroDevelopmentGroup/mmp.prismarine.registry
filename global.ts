import type Instance from '../../instance/index.js';
import { type GlobalMessage, type LocalMessage } from './shared.js';

export default async function (instance: Instance): Promise<void> {
  const channel = instance.createChannel<GlobalMessage, LocalMessage>(
    'registry',
  );

  const client = instance.client;

  channel.subscribe(() => {
    // message is ignored since it is (should be) undefined

    channel.write({
      version: client.version,
      protocolVersion: client.protocolVersion,
    });
  });
}
