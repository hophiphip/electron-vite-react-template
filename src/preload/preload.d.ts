import type { ContextBridgeApi } from "./src/types";

declare global {
    interface Window {
        api: {
            ipcRenderer: ContextBridgeApi
        }
    }
}

export {};