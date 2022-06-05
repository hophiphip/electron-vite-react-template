import type { ContextBridgeApi } from './src/channels';

declare global {
    type ContextBridgeApi = {
        platform: () => Promise<string>,
    };

    interface Window {
        api: {
            ipcRenderer: ContextBridgeApi
        }
    };
};
