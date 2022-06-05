import log from 'electron-log';
import { isDebug } from './utlis';

/**
 * Log error message.
 * @param {string} message - Log message.
 * @param {any} error      - Error for logging. 
 */
export const logErr = (message: string, error: any) => {
    const msg = `${message}: ${error}`;

    if (isDebug) {
        console.error(msg);
    } else {
        log.error(msg);
    }
};