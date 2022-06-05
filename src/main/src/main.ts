import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path';
import log from './log';

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
    app.quit();
    process.exit(0);
}

const createWindow = async (): Promise<BrowserWindow> => {
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

    const pageUrl = import.meta.env.DEV
        ? 'http://localhost:3000'
        : new URL('../renderer/index.html', `file://${__dirname}`).toString();
    
    await browserWindow.loadURL(pageUrl);

    return browserWindow;
};

app.on('second-instance', () => {
    createWindow().catch((err) => {
        log('Error while trying to prevent second-instance Electron event', err);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    createWindow().catch((err) => {
        log('Error while trying to activate Electron event', err);
    });
});


app.whenReady()
    .then(createWindow)
    .catch((err) => log('Failed to create window', err));