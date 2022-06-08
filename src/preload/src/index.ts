import { contextBridge, ipcRenderer } from 'electron';
import { ContextBridgeApi } from '../../types/bridge';
import { Channels } from '../../types/channels';

const contextBridgeApi: ContextBridgeApi = {
    platform: () => {
        ipcRenderer.send(Channels.Platform);
        return new Promise((resolve) => {
            ipcRenderer.once(Channels.PlatformSuccess, (_, data: string) => {
                resolve(data);
            });
        });
    },
};

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: contextBridgeApi
});