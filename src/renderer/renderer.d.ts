/// <reference types="vite/client" />

import { ContextBridgeApi } from '../types/bridge';

declare global {
    interface Window {
        api: {
            ipcRenderer: ContextBridgeApi
        }
    }
}