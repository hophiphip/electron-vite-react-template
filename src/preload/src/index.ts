import { contextBridge } from 'electron';
import type { ContextBridgeApi } from './types';

const contextBridgeApi: ContextBridgeApi = {
    platform: () => process.platform,
};

contextBridge.exposeInMainWorld('api', {
    ipcRenderer: contextBridgeApi
});