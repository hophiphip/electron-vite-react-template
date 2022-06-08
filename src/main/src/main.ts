import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { logErr } from './log';
import { registerIpc } from './ipc';

const isSingleInstance = app.requestSingleInstanceLock();
const isDebug = process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

console.log(isDebug);
console.log(import.meta.env.DEV);

if (!isSingleInstance) {
    app.quit();
    process.exit(0);
}

const createWindow = async (): Promise<BrowserWindow> => {
    const pageUrl = import.meta.env.DEV ? 'http://localhost:3000' : new URL('../renderer/index.html', `file://${__dirname}`).toString();
    const browserWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        webPreferences: {
            preload: join(__dirname, '../preload/index.cjs'),
        },
    });

    browserWindow.on('ready-to-show', () => {
        browserWindow?.show();
    });

    await browserWindow.loadURL(pageUrl);

    return browserWindow;
};

app.whenReady()
    .then(() => {
        createWindow();
        registerIpc();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow();
        });
    })
    .catch((err) => logErr('Failed to create window', err));

app.on('second-instance', () => {
    createWindow()
        .catch((err) => {
            logErr('Error while trying to prevent second-instance Electron event', err);
        });
});
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});