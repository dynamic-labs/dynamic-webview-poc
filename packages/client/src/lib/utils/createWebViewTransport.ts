import { custom } from 'viem';
import { Core } from '../client';

const uniqueId = (() => {
  let idCounter = 0;

  return (prefix: string = ''): string => {
    return `${prefix}${++idCounter}`;
  };
})();

export const createWebViewTransport = (address: string, core: Core) =>
  custom({
    request: (args) => {
      return new Promise((resolve, reject) => {
        const id = uniqueId('requestRpc');

        core.webViewOutboundEventEmitter.on('requestRpcReject', (response) => {
          if (response.id !== id) return;

          reject(new Error(response.data as string));
        });

        core.webViewOutboundEventEmitter.on('requestRpcResolve', (response) => {
          if (response.id !== id) return;

          resolve(response.data);
        });

        core.webViewInboundEventEmitter.send('requestRpc', {
          id,
          address,
          args,
        });
      });
    },
  });
