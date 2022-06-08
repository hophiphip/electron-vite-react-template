import log from 'electron-log';

/**
 * Log error message.
 * @param {string} message - Log message.
 * @param {any} error      - Error for logging. 
 */
export const logErr = (message: string, error: any) => {
    const msg = `${message}: ${error}`;

    if (import.meta.env.DEV) {
        console.error(msg);
    } else {
        log.error(msg);
    }
};