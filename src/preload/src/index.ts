import { contextBridge, ipcRenderer } from 'electron';
import { Ipc } from './channels';

const contextBridgeApi: ContextBridgeApi = {
    platform: () => {
        ipcRenderer.send(Ipc.platform);
        return new Promise((resolve) => {
            ipcRenderer.once(Ipc.platformSuccess, (_, data: string) => {
                resolve(data);
            });
        });
    },
};

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: contextBridgeApi
});