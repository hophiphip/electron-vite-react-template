import { contextBridge, shell } from 'electron';
import type { ContextBridgeApi } from './types';

const contextBridgeApi: ContextBridgeApi = {
    openUrl: (url: string) => shell.openExternal(url),
};

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: contextBridgeApi
});