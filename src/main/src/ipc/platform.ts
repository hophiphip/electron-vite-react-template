import { ipcMain } from 'electron';
import { Channels } from '../../../types/channels';

export default () => {
    ipcMain.on(Channels.Platform, async (evt, _) => {
        evt.reply(Channels.PlatformSuccess, process.platform);
    });
};