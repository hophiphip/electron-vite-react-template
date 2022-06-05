import { ipcMain } from "electron";
import { Ipc } from '../../../preload/src/channels';

export default () => {
    ipcMain.on(Ipc.platform, async (evt, _) => {
        evt.reply(Ipc.platformSuccess, process.platform);
    });
};